"use client";

import { useEffect } from "react";
import Quiz from "@/components/quiz";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useQuizActions from "@/store/quiz/actions";
import Loader from "@/components/ui/loader";

export default function ChatWithFiles() {
  const { quizState, appState } = useSystemFunctions();
  const { generateQuestions } = useQuizActions();

  const { loading, questions } = quizState;

  // Load example.pdf from public folder on component mount
  useEffect(() => {
    generateQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.files]);

  if (loading || questions.length === 0) {
    return <Loader text="Generating quiz..." />;
  }

  return (
    <PageWrapper variant="quiz" showVariantHeader={false}>
      <Quiz />
    </PageWrapper>
  );
}
