/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { SyncedEditor } from "@/features/collab/SyncedEditor/SyncedEditor";
import { selectMatchState } from "@/features/match/state/matchSelector";

import "./styles.css";

const page = () => {
  const { push } = useRouter();
  const { language, question, roomId } = useSelector(selectMatchState);
  const [isClient, setIsClient] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setIsClient(true);
    if (!(language && question && roomId)) {
      push("/matching");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isClient && language && question && roomId ? (
    <SyncedEditor language={language} question={question} roomId={roomId} />
  ) : null;
};

export default page;
