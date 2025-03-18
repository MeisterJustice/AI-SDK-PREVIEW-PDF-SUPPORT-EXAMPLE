"use client";

import { useEffect } from "react";
import { Loader2, Brain } from "lucide-react";
import Quiz from "@/components/quiz";
import PageWrapper from "@/components/ui/page-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useQuizActions from "@/store/quiz/actions";
import useAppActions from "@/store/app/actions";

export default function ChatWithFiles() {
  const { quizState, appState } = useSystemFunctions();
  const { generateQuestions } = useQuizActions();
  const { loadExamplePdf } = useAppActions();

  const { loading, questions } = quizState;

  // Load example.pdf from public folder on component mount
  useEffect(() => {
    const initializeQuiz = async () => {
      if (!appState.files || appState.files.length === 0) {
        // No files loaded yet, load example
        await loadExamplePdf();
      } else {
        // Files already loaded, generate questions
        generateQuestions(appState.files as File[]);
      }
    };

    initializeQuiz();
  }, []);

  if (loading || questions.length === 0) {
    return (
      <PageWrapper variant="quiz" showVariantHeader={false}>
        <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center h-full">
          <Loader2 className="h-10 w-10 animate-spin text-icon" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper variant="quiz" showVariantHeader={false}>
      <Quiz />
    </PageWrapper>
  );
}
