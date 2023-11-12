"use client";

import { useSelector } from "react-redux";

import { selectAuthData } from "@/features/auth";

import { useGetHistoryQuery } from "@/services/historyApi";

import { HistoryTable } from "../features/home/components/HistoryTable";
import { QuestionOfTheDayCard } from "../features/home/components/QuestionOfTheDayCard";
import { WeeklySummaryCard } from "../features/home/components/WeeklySummaryCard";
import { questionStub } from "../features/home/stub/questionStub";

const page = () => {
  const { currentUser } = useSelector(selectAuthData);

  const auth = useSelector(selectAuthData);
  const { data: history } = useGetHistoryQuery({
    userId: auth.currentUser?.id,
  });

  if (currentUser) {
    return (
      <div>
        <h1 className="my-4 text-3xl font-semibold">
          Welcome Back, {currentUser.name}!
        </h1>
        <div className="flex w-full gap-x-5">
          <WeeklySummaryCard history={history ?? []} />
          <QuestionOfTheDayCard question={questionStub} />
        </div>
        <h1 className="my-4 text-3xl font-semibold">Past Interview</h1>
        <HistoryTable histories={history || []} />
      </div>
    );
  }
  return <p>Landing</p>;
};

export default page;
