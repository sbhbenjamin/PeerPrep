"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetHistoryQuery } from "@/services/historyApi";

import QuestionOfTheDayCard from "./components/QuestionOfTheDayCard";

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
        <Card className="flex min-w-[33%] gap-6">
          <CardHeader>
            <CardTitle>
              <p className="text-xl">Completed This Week</p>
            </CardTitle>
            <p className="text-3xl font-semibold">5 Interviews</p>
            <p>Nov 6, 2023 - Nov 12., 2023</p>
          </CardHeader>
        </Card>
        <QuestionOfTheDayCard question={questionStub} />
      </div>
      <h1 className="my-4 text-3xl font-semibold">Past Interview</h1>
    </div>
  );
};

export default page;
