import { Link as LinkIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Category, Difficulty } from "../types/question.type";
import { categoryColors } from "../utils/categoryStyles";

export interface QuestionCardProps {
  id: string;
  title: string;
  categories: Category[];
  description: string;
  difficulty: Difficulty;
  link: string;
  deleteQuestion: (id: string) => void;
  deleteQuestionError: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  categories,
  difficulty,
  description,
  link,
  deleteQuestion,
  deleteQuestionError,
}) => {
  const [isDeletePending, setIsDeletePending] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsDeletePending(true);
    console.log("[QuestionCard] Deleting ID: ", id);
    deleteQuestion(id);
  };

  useEffect(() => {
    if (deleteQuestionError) {
      setIsDeletePending(false);
    }
  }, [deleteQuestionError]);

  return (
    <Card>
      <Accordion type="single" collapsible>
        <AccordionItem value="description">
          <CardHeader>
            <AccordionTrigger className="py-0">
              <div className="flex flex-col items-start gap-2">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {difficulty}
                </p>
                <CardTitle>{title}</CardTitle>
              </div>
            </AccordionTrigger>
            <CardDescription>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <div key={category}>
                    <Badge
                      className={categoryColors[category]}
                      variant="outline"
                    >
                      {category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccordionContent>
              {description.split("\n").map((line, index) => (
                <React.Fragment key={`${line}-${index}`}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </AccordionContent>
          </CardContent>

          <CardFooter className="flex justify-between">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="icon">
                <LinkIcon />
              </Button>
            </a>
            <Button
              variant="outline"
              isLoading={isDeletePending}
              onClick={handleButtonClick}
            >
              Delete
            </Button>
          </CardFooter>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
