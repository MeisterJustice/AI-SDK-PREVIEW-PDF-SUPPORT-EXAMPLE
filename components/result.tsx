"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface ResultProps {
  numberOfQuestions: number;
  numberOfCorrectAnswers: number;
  restart: () => void;
}

const Result = ({
  numberOfQuestions,
  numberOfCorrectAnswers,
  restart,
}: ResultProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = Math.round(
    (numberOfCorrectAnswers / numberOfQuestions) * 100
  );

  const remark = () => {
    let scoreCategory = 0;
    if (percentage >= 80) scoreCategory = 3;
    else if (percentage >= 60) scoreCategory = 2;
    else scoreCategory = 1;

    // Use switch on the numeric category
    switch (scoreCategory) {
      case 3:
        return "Excellent! You've mastered this topic!";
      case 2:
        return "Good job! Keep practicing to improve.";
      case 1:
      default:
        return "Keep studying and try again soon.";
    }
  };

  // Trigger confetti if score is good
  useEffect(() => {
    if (percentage >= 70 && !showConfetti) {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [percentage, showConfetti]);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-full max-w-md mx-auto bg-largeCard rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl lg:text-3xl font-bold text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Quiz Results
        </motion.h2>

        <motion.div
          className="flex flex-col items-center justify-center space-y-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="10"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <motion.circle
                className="text-icon stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (percentage / 100) * 251.2}
                initial={{ strokeDashoffset: 251.2 }}
                animate={{
                  strokeDashoffset: 251.2 - (percentage / 100) * 251.2,
                }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-lg mb-2">
              You scored{" "}
              <span className="font-bold text-icon">
                {numberOfCorrectAnswers}
              </span>{" "}
              out of <span className="font-bold">{numberOfQuestions}</span>{" "}
              questions
            </p>
            <p>{remark()}</p>
          </div>
        </motion.div>

        <motion.button
          className="w-full bg-icon hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          onClick={restart}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Result;
