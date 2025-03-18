"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Quiz from "@/components/quiz";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useQuizActions from "@/store/quiz/actions";

export default function ChatWithFiles() {
  const { quizState, appState } = useSystemFunctions();
  const { generateQuestions } = useQuizActions();

  const { loading, questions } = quizState;

  // Load example.pdf from public folder on component mount
  useEffect(() => {
    generateQuestions();
  }, [appState.files]);

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-icon" />
      </div>
    );
  }

  return (
    <PageWrapper variant="quiz" showVariantHeader={false}>
      <Quiz />
    </PageWrapper>
  );
}
