import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

import { Editor } from "@monaco-editor/react";

import type { Message, User } from "../types";
import ChatWindow from "./ChatWindow";

import "./styles.css";

export default function SyncedEditor({ roomId }: { roomId: string }) {
  const [userNameSelected, setUsernameSelected] = useState<string>();
  const [editorContent, setEditorContent] = useState<string>(
    "// add your code here",
  );
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    const URL = "http://localhost:4001";
    const socket = io(URL, { autoConnect: false });
    socket.on("connect_error", (err) => {
      console.error(err);
      if (err.message === "invalid username") {
        setUsernameSelected(undefined);
      }
    });
    socket.on("users", (users: User[]) => {
      console.log(`recv: ${users}`);
      users.forEach((user: User) => {
        user.isSelf = user.userID === socket.id;
      });
      // put the current user first, and then sort by username
      setConnectedUsers(
        users.sort((a: User, b: User) => {
          if (a.isSelf) return -1;
          if (b.isSelf) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        }),
      );
    });
    socket.on("user_connected", (newUser: User) => {
      setConnectedUsers((currUsers) => [...currUsers, newUser]);
    });
    socket.on("code_update", (content: string) => {
      setEditorContent(content);
    });
    socket.on("message", (content: Message) => {
      console.log(`${content.username}: ${content.content}`);
      setChatMessages((Messages) => [...chatMessages, content]);
    });
    socketRef.current = socket;
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      if (!userNameSelected) {
        setUsernameSelected(Math.floor(Math.random() * 100).toString());
      }
      socketRef.current.auth = {
        username: userNameSelected,
      };
      socketRef.current.connect();
      socketRef.current.emit("join", roomId);
    }
  }, [userNameSelected, socketRef.current]);

  // const handleLanguageChange = (value: string) => {
  //     monaco.editor.setModel
  //     const model = monacoInstance?.editor.getModel();
  //     monacoInstance?.editor
  //     if (monacoInstance && monacoInstance.editor.getModel()) {
  //         monacoInstance.editor.setModelLanguage(monacoInstance.editor.getModel(), value);
  //     }
  // }

  const handleOnEditorChange = (value: string | undefined) => {
    if (socketRef.current) {
      console.log("sending ", value, "to ", roomId);
      socketRef.current.emit("code_update", {
        content: value,
        to: roomId,
      });
    }
  };

  const sendMessage = (value: string | undefined) => {
    if (socketRef.current) {
      console.log("sending ", value, "to ", roomId);
      socketRef.current.emit("message", {
        content: value,
        to: roomId,
        from: userNameSelected,
      });
      setChatMessages((messages) => [
        ...messages,
        { username: userNameSelected, content: value } as Message,
      ]);
    }
  };

  return (
    <div className="synced-editor">
      <div className="editor-container">
        {/* <input type="radio" value="javascript" onChange={e => handleLanguageChange(e.target.value)} /> */}
        <Editor
          value={editorContent}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onChange={handleOnEditorChange}
        />
      </div>
      <div className="user-display-container">
        <ChatWindow
          users={connectedUsers}
          messages={chatMessages}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
