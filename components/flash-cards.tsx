import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Result from "./result";
import useAppActions from "@/store/app/actions";

const flashCards = [
  {
    question:
      "What is the capital of France? What is the capital of France? What is the capital of France? What is the capital of France? What is the capital of France?",
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

    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashCards.length);
  };

  const handlePrev = () => {
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

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 15,
  };

  const cardVariants = {
    initial: (direction: number) => ({
      rotateY: direction === 1 ? -90 : direction === -1 ? 90 : 0,
      opacity: direction !== 0 ? 0 : 1,
      transition: springConfig,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: springConfig,
    },
    exit: (direction: number) => ({
      rotateY: direction === 1 ? 90 : direction === -1 ? -90 : 0,
      opacity: 0,
      transition: springConfig,
    }),
    flipped: {
      rotateX: 180,
      transition: springConfig,
    },
    unflipped: {
      rotateX: 0,
      transition: springConfig,
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
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            className="w-full h-full absolute"
            custom={direction}
            variants={cardVariants}
            initial="initial"
            animate={isFlipped ? "flipped" : "unflipped"}
            exit="exit"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="w-full h-full relative cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="w-full h-full bg-largeCard rounded-lg p-8 flex items-center justify-center absolute shadow-lg"
                style={{
                  backfaceVisibility: "hidden",
                }}
              >
                <p className="text-2xl lg:text-3xl font-medium text-center">
                  {flashCards[currentIndex].question}
                </p>
              </motion.div>

              <motion.div
                className="w-full h-full bg-largeCard rounded-lg p-8 flex items-center justify-center absolute shadow-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                }}
              >
                <p className="text-2xl lg:text-3xl font-medium text-center">
                  {flashCards[currentIndex].answer}
                </p>
              </motion.div>
            </div>
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
