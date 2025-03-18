import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Result from "./result";
import useAppActions from "@/store/app/actions";

const flashCards = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    answer: "4",
  },
  {
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
  },
];

const FlashCards = ({
  isLarge = false,
  hideInput = false,
}: {
  isLarge?: boolean;
  hideInput?: boolean;
}) => {
  const { showFileInput } = useAppActions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (currentIndex === flashCards.length - 1) {
      setShowResult(true);
      if (hideInput) {
        showFileInput(false);
      }
      return;
    }

    setDirection(1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashCards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashCards.length) % flashCards.length
    );
  };

  const handleRestart = () => {
    setShowResult(false);
    setCurrentIndex(0);
    setIsFlipped(false);
    showFileInput(true);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? -90 : 90,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  if (showResult) {
    return (
      <Result
        numberOfCorrectAnswers={2}
        numberOfQuestions={flashCards.length}
        restart={handleRestart}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className={`w-full relative ${
          isLarge
            ? "aspect-[2/2] xl:aspect-[3/2]"
            : "aspect-[3/2] xl:aspect-[5/2]"
        }`}
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full absolute cursor-pointer"
            onClick={() => setIsFlipped((prev) => !prev)}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={{ rotateX: isFlipped ? 180 : 0 }}
              transition={{
                type: "spring",
                stiffness: 800,
                damping: 40,
                duration: 0.3,
              }}
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute w-full h-full bg-largeCard rounded-lg p-8 flex items-center justify-center shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-2xl lg:text-3xl font-medium text-center">
                  {flashCards[currentIndex].question}
                </p>
              </div>

              <div
                className="absolute w-full h-full bg-largeCard rounded-lg p-8 flex items-center justify-center shadow-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                }}
              >
                <p className="text-2xl lg:text-3xl font-medium text-center">
                  {flashCards[currentIndex].answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <span className="text-sm w-10 text-center">
          {currentIndex + 1} / {flashCards.length}
        </span>

        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FlashCards;
