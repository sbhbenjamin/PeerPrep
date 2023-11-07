import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { Socket } from "socket.io-client";

import { Editor, useMonaco } from "@monaco-editor/react";

import { Button } from "@/components/ui/button";

import type { Language } from "@/features/match";
import { resetMatchDetails } from "@/features/match/state/matchSlice";
import { NotificationType, setNotification } from "@/features/notifications";
import type { QuestionType } from "@/features/questions";

import { useAddHistoryMutation } from "@/services/historyApi";

import { QuestionDisplay } from "../QuestionDisplay";
import type { Message } from "../types";
import { Status } from "../types";
import { ChatWindow } from "./ChatWindow";

import { useApiNotifications } from "@/hooks/useApiNotifications";

export function SyncedEditor({
  socket,
  language,
  question,
  roomId,
  userId,
}: {
  socket: Socket;
  language: Language;
  question: QuestionType;
  roomId: string;
  userId: number;
}) {
  const dispatch = useDispatch();
  const monaco = useMonaco();
  const { push } = useRouter();
  const [partnerStatus, setPartnerStatus] = useState<Status>(
    Status.Disconnected,
  );
  const [editorContent, setEditorContent] = useState<string>(
    "// add your code here",
  );

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

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
    socket.removeAllListeners();
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
      setPartnerStatus(Status.Disconnected);
      const notificationPayload = {
        type: NotificationType.ERROR,
        value: errorMessage,
      };
      dispatch(setNotification(notificationPayload));
      push("/matching");
    });

    socket.on("connected", (connectedUsername: string) => {
      setPartnerStatus(Status.Connected);
      const notificationPayload = {
        type: NotificationType.SUCCESS,
        value: `${connectedUsername} has joined`,
      };
      dispatch(setNotification(notificationPayload));
    });

    socket.on("end_session", (disconnectedUsername: string) => {
      setPartnerStatus(Status.SessionEnded);
      const notificationPayload = {
        type: NotificationType.ERROR,
        value: `${disconnectedUsername} has ended the session`,
      };
      dispatch(setNotification(notificationPayload));
    });

    socket.on("disconnected", (disconnectedUsername: string) => {
      if (partnerStatus !== Status.SessionEnded) {
        setPartnerStatus(Status.Disconnected);
      }
      const notificationPayload = {
        type: NotificationType.ERROR,
        value: `${disconnectedUsername} has disconnected`,
      };
      dispatch(setNotification(notificationPayload));
    });

    socket.connect();
    socket.emit("join", roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnEditorChange = (value: string | undefined) => {
    socket.emit("code_update", {
      content: value,
      to: roomId,
    });
  };

  const handleLeaveSession = () => {
    socket.emit("leave", roomId);
    dispatch(resetMatchDetails());
    push("/");
  };

  const handleSubmitCode = () => {
    addHistory({
      userId,
      questionId: question.id,
      question,
    });
  };

  const sendMessage = (value: string | undefined) => {
    if (value) {
      const message = {
        username: userId.toString(),
        content: value,
      } as Message;
      socket.emit("message", {
        to: roomId,
        message,
      });
      setChatMessages((messages: Message[]) => [...messages, message]);
    }
  };

  return (
    <div className="flex h-[80vh] gap-2">
      <div className="w-3/12">
        <QuestionDisplay contentClassName="max-h-[65vh]" question={question} />
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
        <ChatWindow
          contentClassName="max-h-[60vh]"
          messages={chatMessages}
          sendMessage={sendMessage}
          currentUser={userId.toString()}
          partnerStatus={partnerStatus as string}
        />
        <div className="flex flex-row gap-x-2">
          <Button variant="destructive" onClick={handleLeaveSession}>
            Leave
          </Button>
          <Button onClick={handleSubmitCode}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
