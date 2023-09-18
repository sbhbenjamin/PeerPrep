import { Link as LinkIcon } from 'lucide-react';
import React from 'react';

import type { Category, Difficulty } from '../types/question.type';
import { categoryColors } from '../utils/categoryStyles';
import { difficultyColors } from '../utils/difficultyStyles';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface QuestionCardProps {
  id: string;
  title: string;
  categories: Category[];
  description: string;
  difficulty: Difficulty;
  link: string;
  deleteQuestion: (id: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  categories,
  difficulty,
  description,
  link,
  deleteQuestion,
}) => {
  const handleButtonClick = () => {
    console.log('[QuestionCard] Deleting ID: ', id);
    deleteQuestion(id);
  };

  return (
    <Card>
      <Accordion type="single" collapsible>
        <AccordionItem value="description">
          <CardHeader>
            <CardTitle className="flex flex-col">
              <AccordionTrigger className="pb-0">
                <div className="flex gap-2">
                  <p>{title}</p>
                  <Badge className={`${difficultyColors[difficulty]} text-xs`}>
                    {difficulty}
                  </Badge>
                </div>
              </AccordionTrigger>
            </CardTitle>

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
              {description.split('\n').map((line, index) => (
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
            <Button variant="outline" onClick={handleButtonClick}>
              Delete
            </Button>
          </CardFooter>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default QuestionCard;
