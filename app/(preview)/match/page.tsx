"use client";

import { useEffect, useState } from "react";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useMatchActions from "@/store/match/actions";
import Result from "@/components/result";
import useAppActions from "@/store/app/actions";
import StartGame from "./start-game";
import MatchGame from "./match-game";
import Loader from "@/components/ui/loader";

export default function MatchPage() {
  const { matchState, appState } = useSystemFunctions();
  const { generateMatchItems, isGenerating } = useMatchActions();
  const { showFileInput } = useAppActions();

  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleRestart = () => {
    setGameCompleted(false);
    showFileInput(true);
    generateMatchItems();
  };

  useEffect(() => {
    generateMatchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.files]);

  if (!gameStarted) {
    return <StartGame handleStartGame={() => setGameStarted(true)} />;
  }

  if (isGenerating || matchState.items.length === 0) {
    return <Loader text="Generating questions..." />;
  }

  if (gameCompleted) {
    return (
      <Result
        numberOfCorrectAnswers={matchState.items.length / 2}
        numberOfQuestions={matchState.items.length / 2}
        restart={handleRestart}
      />
    );
  }

  return (
    <MatchGame
      gameCompleted={gameCompleted}
      handleCompleteGame={setGameCompleted}
    />
  );
}
