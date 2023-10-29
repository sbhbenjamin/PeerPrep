import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

import { Editor, useMonaco } from "@monaco-editor/react";

import { questionsStub } from "@/features/questions/stubs/questions.stub";

import { QuestionDisplay } from "../QuestionDisplay";
import type { Message, User } from "../types";
import { ChatWindow } from "./ChatWindow";

export function SyncedEditor({ roomId }: { roomId: string }) {
  const monaco = useMonaco();
  const URL = "http://localhost:4001";
  const [currentUser, setCurrentUser] = useState<string>();
  const [editorContent, setEditorContent] = useState<string>(
    "// add your code here",
  );
  const [numConnectedUsers, setNumConnectedUsers] = useState<number>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket>();

  const monacoConfig = {
    fontSize: 14,
  };

  useEffect(() => {
    const socket = io(URL, { autoConnect: false });

    socket.on("connect_error", (err) => {
      console.error(err);
      if (err.message === "invalid username") {
        setCurrentUser(undefined);
      }
    });

    socket.on("users", (users: User[]) => {
      console.log(`recv: ${users}`);
      setNumConnectedUsers(users.length);
    });

    socket.on("user_connected", (newUser: User) => {
      setNumConnectedUsers(
        (prevNumConnectedUsers: number) => prevNumConnectedUsers - 1,
      );
    });

    socket.on("code_update", (content: string) => {
      setEditorContent(content);
    });

    socket.on("message", (content: Message) => {
      console.log(`incoming message ${content.username}: ${content.content}`);
      // required to reference the most recent state of chatMessages
      setChatMessages((prevMessages: Message[]) => [...prevMessages, content]);
    });
    socketRef.current = socket;
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      if (!currentUser) {
        setCurrentUser(Math.floor(Math.random() * 100).toString());
      }
      socketRef.current.auth = {
        username: currentUser,
      };
      socketRef.current.connect();
      socketRef.current.emit("join", roomId);
    }
  }, [currentUser, socketRef.current]);

  // const handleLanguageChange = (value: string) => {
  //   monaco.editor.setModel;
  //   const model = monacoInstance?.editor.getModel();
  //   monacoInstance?.editor;
  //   if (monacoInstance && monacoInstance.editor.getModel()) {
  //     monacoInstance.editor.setModelLanguage(
  //       monacoInstance.editor.getModel(),
  //       value,
  //     );
  //   }
  // };

  const handleOnEditorChange = (value: string | undefined) => {
    if (socketRef.current) {
      console.log("[Code] sending ", value, "to ", roomId);
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
        from: currentUser,
      });
      setChatMessages((messages: Message[]) => [
        ...messages,
        { username: currentUser, content: value } as Message,
      ]);
    }
  };

  return (
    <div className="flex h-[80vh] gap-2">
      <div className="w-3/12">
        <QuestionDisplay question={questionsStub[0]} />
      </div>
      <div className="w-6/12 overflow-hidden rounded-lg border py-2 shadow-sm">
        {/* <input type="radio" value="javascript" onChange={e => handleLanguageChange(e.target.value)} /> */}
        <Editor
          value={editorContent}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onChange={handleOnEditorChange}
          options={monacoConfig}
        />
      </div>
      <div className="w-3/12">
        {currentUser && (
          <ChatWindow
            messages={chatMessages}
            sendMessage={sendMessage}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}
