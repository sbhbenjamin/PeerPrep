/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import QuestionDisplay from "@/features/collab/QuestionDisplay";
import SyncedEditor from "@/features/collab/SyncedEditor/SyncedEditor";

import "./styles.css";

const page = () => (
  <div className="main">
    <div className="question-container">
      <QuestionDisplay question={{}} />
    </div>
    <div className="synced-container">
      <SyncedEditor roomId="123" />
    </div>
  </div>
);

export default page;
