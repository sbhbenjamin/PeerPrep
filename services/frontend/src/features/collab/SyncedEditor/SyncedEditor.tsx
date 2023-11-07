import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { Editor, useMonaco } from "@monaco-editor/react";

import { Button } from "@/components/ui/button";

import { selectAuthData } from "@/features/auth";
import type { Language } from "@/features/match";
import { resetMatchDetails } from "@/features/match/state/matchSlice";
import { NotificationType, setNotification } from "@/features/notifications";
import type { QuestionType } from "@/features/questions";

import { useAddHistoryMutation } from "@/services/historyApi";

import { QuestionDisplay } from "../QuestionDisplay";
import type { Message } from "../types";
import { ChatWindow } from "./ChatWindow";

import { useApiNotifications } from "@/hooks/useApiNotifications";

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
  const { push } = useRouter();
  const auth = useSelector(selectAuthData);
  const URL = "http://localhost:4001";
  const [currentUser, setCurrentUser] = useState<string>(uuidv4().toString());
  const [selfIsConnected, setSelfIsConnected] = useState<boolean>(false);
  const [partnerIsConnected, setPartnerIsConnected] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>(
    "// add your code here",
  );

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket>();

  const [addHistory, { isSuccess: isSubmitSuccess, isError: isSubmitError }] =
    useAddHistoryMutation();

  useApiNotifications({
    isSuccess: isSubmitSuccess,
    isError: isSubmitError,
    successMessage: "Attempt successfully submitted!",
    errorMessage:
      "Something went wrong while submitting your attempt. Please try again later.",
  });

  const monacoConfig = {
    fontSize: 14,
  };

  useEffect(() => {
    if (socketRef.current) {
      return;
    }
    const socket = io(URL, { autoConnect: false });

    socket.on("code_update", (content: string) => {
      setEditorContent(content);
    });

    socket.on("message", (messages: Message[]) => {
      // required to reference the most recent state of chatMessages
      setChatMessages((prevMessages: Message[]) => [
        ...prevMessages,
        ...messages,
      ]);
    });

    socket.on("error", (errorMessage: string) => {
      setPartnerIsConnected(true);
      const notificationPayload = {
        type: NotificationType.SUCCESS,
        value: errorMessage,
      };
      dispatch(setNotification(notificationPayload));
    });

    socket.on("connected", (connectedUsername: string) => {
      setPartnerIsConnected(true);
      const notificationPayload = {
        type: NotificationType.SUCCESS,
        value: `${connectedUsername} has joined`,
      };
      dispatch(setNotification(notificationPayload));
    });

    socket.on("end_session", (disconnectedUsername: string) => {
      setPartnerIsConnected(false);
      setSelfIsConnected(false);
      const notificationPayload = {
        type: NotificationType.ERROR,
        value: `${disconnectedUsername} has ended the session`,
      };
      dispatch(setNotification(notificationPayload));
    });

    socket.on("disconnected", (disconnectedUsername: string) => {
      setPartnerIsConnected(false);
      const notificationPayload = {
        type: NotificationType.ERROR,
        value: `${disconnectedUsername} has disconnected`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelfIsConnected(socketRef.current?.connected ?? false);
  }, [socketRef.current?.connected]);

  const handleOnEditorChange = (value: string | undefined) => {
    if (socketRef.current) {
      socketRef.current.emit("code_update", {
        content: value,
        to: roomId,
      });
    }
  };

  const handleLeaveSession = () => {
    if (socketRef.current) {
      socketRef.current.emit("leave", roomId);
    }
    dispatch(resetMatchDetails());
    push("/");
  };

  const handleSubmitCode = () => {
    if (auth.currentUser) {
      addHistory({
        userId: auth.currentUser.id,
        questionId: question.id,
        question,
      });
    }
  };

  const sendMessage = (value: string | undefined) => {
    if (socketRef.current && value) {
      const message = { username: currentUser, content: value } as Message;
      socketRef.current.emit("message", {
        to: roomId,
        message,
      });
      setChatMessages((messages: Message[]) => [...messages, message]);
    }
  };

  return (
    <div>
      <div className="flex h-[80vh] gap-2">
        <div className="w-3/12">
          <QuestionDisplay
            contentClassName="max-h-[65vh]"
            question={question}
          />
        </div>
        <div className="w-6/12 overflow-hidden rounded-lg border py-2 shadow-sm">
          <Editor
            value={editorContent}
            defaultLanguage={language}
            onChange={handleOnEditorChange}
            options={monacoConfig}
          />
        </div>
        <div className="flex w-3/12 flex-col gap-y-2">
          {currentUser && (
            <ChatWindow
              contentClassName="max-h-[60vh]"
              messages={chatMessages}
              sendMessage={sendMessage}
              currentUser={currentUser}
            />
          )}
          <div className="flex flex-row gap-x-2">
            {partnerIsConnected ? (
              <Button variant="destructive" onClick={handleLeaveSession}>
                Leave
              </Button>
            ) : null}
            <Button disabled={!auth.currentUser} onClick={handleSubmitCode}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div>
        Status: {selfIsConnected ? "Connected" : "Not Connected"} Partner:{" "}
        {partnerIsConnected ? "Connected" : "Not Connected"}
      </div>
    </div>
  );
}
