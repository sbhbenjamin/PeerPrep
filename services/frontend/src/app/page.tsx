"use client";

import { useSelector } from "react-redux";

import { selectAuthData } from "@/features/auth";
import { HistoryTable } from "@/features/home/components/HistoryTable";

import { useGetHistoryQuery } from "@/services/historyApi";
import { useGetQuestionOfTheDayQuery } from "@/services/questionApi";

import { QuestionOfTheDayCard } from "../features/home/components/QuestionOfTheDayCard";
import { WeeklySummaryCard } from "../features/home/components/WeeklySummaryCard";

import { useApiNotifications } from "@/hooks/useApiNotifications";

const page = () => {
  const { currentUser } = useSelector(selectAuthData);

  const auth = useSelector(selectAuthData);
  const { data: history, isError: isGetHistoryError } = useGetHistoryQuery({
    userId: auth.currentUser?.id,
  });

  const {
    data: questionOfTheDay,
    isError: isGetQuestionsError,
    isSuccess: isGetQuestionsSuccess,
  } = useGetQuestionOfTheDayQuery();

  useApiNotifications({
    isError: isGetHistoryError,
    errorMessage: "Unable to fetch history",
  });

  if (currentUser) {
    return (
      <div>
        <h1 className="mb-6 mt-4 text-4xl font-bold tracking-tight">
          Welcome Back,{" "}
          <span className="text-accent-foreground">
            {currentUser.name.split(" ")[0]} 🚀
          </span>
        </h1>
        <div className="flex flex-row gap-x-5">
          <WeeklySummaryCard history={history ?? []} />
          <div className="flex grow flex-row gap-6 rounded-sm bg-indigo-50 p-4 dark:bg-slate-900">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-400">
                Question Of The Day
              </h2>
              <p className="text-muted-foreground mb-4">
                Join fellow coders in tackling today&apos;s featured coding
                challenge!
              </p>
            </div>
            <div className="grow">
              <QuestionOfTheDayCard question={questionOfTheDay} />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-x-5" />
        <h2 className="mt-12 text-2xl font-semibold tracking-tight">
          Interviews This Week
        </h2>
        <p className="text-muted-foreground mb-4">
          A list of the questions that you have solved this week.
        </p>
        <HistoryTable histories={history || []} />
      </div>
    );
  }
  return <p>Landing</p>;
};

export default page;
