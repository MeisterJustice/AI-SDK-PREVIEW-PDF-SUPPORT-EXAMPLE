import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizQuestion } from "@/store/quiz/schema";
import {
  questionsContainerVariants,
  questionVariants,
  optionsContainerVariants,
  optionVariants,
  iconVariants,
} from "@/utils/helpers";

interface QuizReviewProps {
  questions: QuizQuestion[];
  userAnswers: string[];
}

export default function QuizReview({
  questions,
  userAnswers,
}: QuizReviewProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const answerLabels: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quiz Review</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={questionsContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {questions.map((question, questionIndex) => (
            <motion.div
              key={questionIndex}
              className="mb-10 last:mb-0"
              variants={questionVariants}
            >
              <h3 className="text-lg font-semibold mb-4">
                {question.question}
              </h3>
              <motion.div
                className="space-y-2"
                variants={optionsContainerVariants}
              >
                {question.options.map((option, optionIndex) => {
                  const currentLabel = answerLabels[optionIndex];
                  const isCorrect = currentLabel === question.answer;
                  const isSelected =
                    currentLabel === userAnswers[questionIndex];
                  const isIncorrectSelection = isSelected && !isCorrect;
                  let status = "neutral";
                  if (isCorrect) {
                    status = "correct";
                  } else if (isIncorrectSelection) {
                    status = "incorrect";
                  }
                  return (
                    <motion.div
                      key={optionIndex}
                      className={`flex items-center p-4 rounded-lg ${
                        status === "neutral" ? "border border-border" : ""
                      }`}
                      custom={{ status, isDark: isDarkMode }}
                      variants={optionVariants}
                    >
                      <span className="text-lg font-medium mr-4 w-6">
                        {currentLabel}
                      </span>
                      <span className="flex-grow">{option}</span>
                      {isCorrect && (
                        <motion.div variants={iconVariants}>
                          <Check
                            className="ml-2 text-green-600 dark:text-green-400"
                            size={20}
                          />
                        </motion.div>
                      )}
                      {isIncorrectSelection && (
                        <motion.div variants={iconVariants}>
                          <X
                            className="ml-2 text-red-600 dark:text-red-400"
                            size={20}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
