"use client";

// needs to be a client component to access localStorage

import React, { useEffect, useState } from "react";

import QuestionCard from "./components/QuestionCard";
import QuestionForm from "./components/QuestionForm";
import type { QuestionType } from "./types/question.type";

const page = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const storedQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]",
    );

    setQuestions(storedQuestions);
  }, [questions]);

  const addQuestion = (newQuestion: QuestionType) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    localStorage.setItem(
      "questions",
      JSON.stringify([...questions, newQuestion]),
    );
  };

  const deleteQuestion = (id: string) => {
    const existingQuestions: QuestionType[] = JSON.parse(
      localStorage.getItem("questions") || "[]",
    );

    // Filter out the question with the given id
    const updatedQuestions = existingQuestions.filter(
      (question) => question.id.toString() !== id,
    );

    // Save the updated list back to local storage
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <h1 className="mb-8 flex text-3xl font-bold">Questions Repository</h1>
        <div className="flex gap-8">
          <div className="w-1/2">
            <h1 className="mb-8 flex text-2xl">Add New Question</h1>
            <QuestionForm
              addQuestion={addQuestion}
              currentQuestions={questions}
            />
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
                      deleteQuestion={deleteQuestion}
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
