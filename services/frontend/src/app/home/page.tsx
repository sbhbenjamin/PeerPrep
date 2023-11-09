"use client";

import { useGetHistoryQuery } from "@/services/historyApi";

import { historiesStub } from "./historyStub";

import UsersHistoryTable from "./components/HistoryTable";
import QuestionOfTheDayCard from "./components/QuestionOfTheDayCard";
import { WeeklySummaryCard } from "./components/WeeklySummaryCard";

const questionStub = {
  id: "7f73cab0-7a27-4d98-bbd6-6d09c1a3e1aa",
  title: "asdas",
  categories: ["Strings"],
  difficulty: "Easy",
  description: "dasdasd",
  link: "http://localhost:3000/questions",
};

const page = () => {
  const { data: question, isError: isGetQuestionsError } = useGetHistoryQuery();

  return (
    <div>
      <h1 className="my-4 text-3xl font-semibold">Welcome Back, Wei Jun!</h1>

      <div className="flex w-full gap-x-5">
        <WeeklySummaryCard />
        <QuestionOfTheDayCard question={questionStub} />
      </div>
      <h1 className="my-4 text-3xl font-semibold">Past Interview</h1>
      <UsersHistoryTable histories={historiesStub} />
    </div>
  );
};

export default page;
