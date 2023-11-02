import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { Editor, useMonaco } from "@monaco-editor/react";

import { selectAuthData } from "@/features/auth";
import type { Language } from "@/features/match";
import type { QuestionType } from "@/features/questions";

import { QuestionDisplay } from "../QuestionDisplay";
import type { Message, User } from "../types";
import { ChatWindow } from "./ChatWindow";

export function SyncedEditor({
  language,
  question,
  roomId,
}: {
  language: Language;
  question: QuestionType;
  roomId: string;
}) {
  const auth = useSelector(selectAuthData);
  const monaco = useMonaco();
  const URL = "http://localhost:4001";
  const [currentUser, setCurrentUser] = useState<string>();
  const [editorContent, setEditorContent] = useState<string>(
    "// add your code here",
  );

  const [numConnectedUsers, setNumConnectedUsers] = useState<number>(0);
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

    socket.on("message", (messages: Message[]) => {
      messages.forEach((message) => {
        console.log(`incoming message ${message.username}: ${message.content}`);
      });
      // required to reference the most recent state of chatMessages
      setChatMessages((prevMessages: Message[]) => [
        ...prevMessages,
        ...messages,
      ]);
    });
    socketRef.current = socket;
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      if (!currentUser) {
        setCurrentUser(auth.currentUser?.id.toString() ?? uuidv4().toString());
      }
      socketRef.current.auth = {
        username: currentUser,
      };
      socketRef.current.connect();
      socketRef.current.emit("join", roomId);
    }
  }, [currentUser, socketRef.current]);

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
    if (socketRef.current && value) {
      console.log("sending ", value, "to ", roomId);
      socketRef.current.emit("message", {
        to: roomId,
        message: { username: currentUser, content: value } as Message,
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
        <QuestionDisplay question={question} />
      </div>
      <div className="w-6/12 overflow-hidden rounded-lg border py-2 shadow-sm">
        {/* <input type="radio" value="javascript" onChange={e => handleLanguageChange(e.target.value)} /> */}
        <Editor
          value={editorContent}
          defaultLanguage={language}
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
