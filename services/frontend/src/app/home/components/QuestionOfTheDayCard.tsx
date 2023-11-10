import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { QuestionType } from "@/features/questions";

interface QuestionOfTheDayCardProps {
  question: QuestionType;
}

export const QuestionOfTheDayCard: React.FC<QuestionOfTheDayCardProps> = ({
  question,
}) => {
  const { title, categories, difficulty, link } = question;
  return (
    <Card className=" flex min-w-[33%]">
      <CardHeader className="w-full">
        <div className="flex w-full  justify-between gap-2">
          <CardTitle>{title}</CardTitle>
          <Badge>{difficulty}</Badge>
        </div>
        <CardDescription>
          <div className="flex gap-2">
            {categories.map((category) => (
              <div key={category}>
                <Badge variant="outline">{category}</Badge>
              </div>
            ))}
          </div>
        </CardDescription>

        <Button className="ml-auto justify-end align-bottom" variant="outline">
          Begin Matching
        </Button>
      </CardHeader>
    </Card>
  );
};
