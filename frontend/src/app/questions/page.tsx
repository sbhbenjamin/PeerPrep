"use client";

import React, { useEffect, useState } from "react";

import type { QuestionType, QuestionWithoutIdType } from "@/features/questions";
import { QuestionCard, QuestionForm } from "@/features/questions";

import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../services/questionApi";

const page = () => {
  const [addQuestion] = useAddQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const { data = [] }: { data?: QuestionType[] } = useGetQuestionsQuery();

  useEffect(() => {
    setQuestions(data);
  }, [data]);

  const handleAddQuestion = (newQuestion: QuestionWithoutIdType) => {
    addQuestion(newQuestion)
      .unwrap()
      .then((returnedQuestion: QuestionType) => {
        setQuestions((prevQuestions) => [...prevQuestions, returnedQuestion]);
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(
          err.data.error[0].message ??
            err.data.error ??
            "An error occurred. Please refresh and try again later",
        );
      });
  };

  const handleDeleteQuestion = (id: string) => {
    deleteQuestion(id)
      .unwrap()
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(
          err.data.error[0].message ??
            err.data.error ??
            "An error occurred. Please refresh and try again later",
        );
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <h1 className="mb-8 flex text-3xl font-bold">Questions Repository</h1>
        <div className="flex gap-8">
          <div className="w-1/2">
            <h1 className="mb-8 flex text-2xl">Add New Question</h1>
            <QuestionForm addQuestion={handleAddQuestion} />
          </div>
          <div className="w-1/2">
            <h1 className="mb-8 flex text-2xl">All Questions</h1>
            <div className="flex flex-col gap-4">
              {questions.map(
                ({ id, title, categories, difficulty, description, link }) => (
                  <div key={id.toString()}>
                    <QuestionCard
                      id={id}
                      title={title}
                      categories={categories}
                      difficulty={difficulty}
                      description={description}
                      link={link}
                      deleteQuestion={handleDeleteQuestion}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
