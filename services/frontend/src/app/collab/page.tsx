/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { SyncedEditor } from "@/features/collab/SyncedEditor/SyncedEditor";
import { selectMatchState } from "@/features/match/state/matchSelector";

import "./styles.css";

const page = () => {
  const { push } = useRouter();
  const { language, question, roomId } = useSelector(selectMatchState);
  if (!(language && question && roomId)) {
    push("/matching");
    return null;
  }
  return (
    <SyncedEditor language={language} question={question} roomId={roomId} />
  );
};

export default page;
