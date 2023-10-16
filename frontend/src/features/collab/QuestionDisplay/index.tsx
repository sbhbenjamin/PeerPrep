import type { Question } from "../types";

import "./styles.css";

type UsersProps = {
  question: Question;
};

export default function QuestionDisplay(props: UsersProps) {
  const { question } = props;
  return <div className="question-display-div" />;
}
