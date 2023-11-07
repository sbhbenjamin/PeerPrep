import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { Editor, useMonaco } from "@monaco-editor/react";

import { selectAuthData } from "@/features/auth";
import type { Language } from "@/features/match";
import { NotificationType, setNotification } from "@/features/notifications";
import type { QuestionType } from "@/features/questions";

import { QuestionDisplay } from "../QuestionDisplay";
import type { Message } from "../types";
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
  const dispatch = useDispatch();
  const monaco = useMonaco();
  const auth = useSelector(selectAuthData);
  const URL = "http://localhost:4001";
  const [currentUser, setCurrentUser] = useState<string>(uuidv4().toString());
  const [editorContent, setEditorContent] = useState<string>(
    "// add your code here",
  );

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket>();

  const monacoConfig = {
    fontSize: 14,
  };

  useEffect(() => {
    const socket = io(URL, { autoConnect: false });

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

    socket.on("connected", (connectedUsername: string) => {
      const notificationPayload = {
        type: NotificationType.SUCCESS,
        value: `${connectedUsername} has joined`,
      };
      dispatch(setNotification(notificationPayload));
    });

    socket.on("disconnected", (disconnectedUsername: string) => {
      const notificationPayload = {
        type: NotificationType.ERROR,
        value: `${disconnectedUsername} has left`,
      };
      dispatch(setNotification(notificationPayload));
    });
    if (auth.currentUser?.id) {
      setCurrentUser(auth.currentUser?.id.toString());
    } else {
      setCurrentUser(uuidv4());
    }
    socket.auth = {
      username: currentUser,
    };
    socket.connect();
    socket.emit("join", roomId);
    socketRef.current = socket;
    return () => {
      socketRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnEditorChange = (value: string | undefined) => {
    if (socketRef.current) {
      socketRef.current.emit("code_update", {
        content: value,
        to: roomId,
      });
    }
  };

  const sendMessage = (value: string | undefined) => {
    if (socketRef.current && value) {
      socketRef.current.emit("message", {
        to: roomId,
        message: { username: currentUser, content: value } as Message,
      });
      setChatMessages((messages: Message[]) => [...messages]);
    }
  };

  return (
    <div className="flex h-[80vh] gap-2">
      <div className="w-3/12">
        <QuestionDisplay question={question} />
      </div>
      <div className="w-6/12 overflow-hidden rounded-lg border py-2 shadow-sm">
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
