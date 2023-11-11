"use client";

import { useSelector } from "react-redux";

import { selectAuthData } from "@/features/auth";

import { HistoryTable } from "../features/home/components/HistoryTable";
import { QuestionOfTheDayCard } from "../features/home/components/QuestionOfTheDayCard";
import { WeeklySummaryCard } from "../features/home/components/WeeklySummaryCard";
import { historiesStub } from "../features/home/stub/historyStub";
import { questionStub } from "../features/home/stub/questionStub";

const page = () => {
  const { currentUser } = useSelector(selectAuthData);

  if (currentUser) {
    return (
      <div>
        <h1 className="my-4 text-3xl font-semibold">Welcome Back, Wei Jun!</h1>
        <div className="flex w-full gap-x-5">
          <WeeklySummaryCard />
          <QuestionOfTheDayCard question={questionStub} />
        </div>
        <h1 className="my-4 text-3xl font-semibold">Past Interview</h1>
        <HistoryTable histories={historiesStub} />
      </div>
    );
  }
  return <p>Landing</p>;
};

export default page;
