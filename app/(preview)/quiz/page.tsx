"use client";

import { useState, useEffect } from "react";
import { experimental_useObject } from "ai/react";
import { questionsSchema } from "@/lib/schemas";
import { z } from "zod";
import { toast } from "sonner";
import { FileUp, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Quiz from "@/components/quiz";
import { Link } from "@/components/ui/link";
import NextLink from "next/link";
import { generateQuizTitle } from "./actions";
import { AnimatePresence, motion } from "framer-motion";
import { VercelIcon, GitIcon } from "@/components/icons";
import PageWrapper from "@/components/ui/page-wrapper";
import { encodeFileAsBase64 } from "@/lib/utils";

export default function ChatWithFiles() {
  const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>(
    []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState<string>();
  const [isLoading, setIsLocalLoading] = useState(true);

  const {
    submit,
    object: partialQuestions,
    isLoading: isGenerating,
  } = experimental_useObject({
    api: "/api/generate-quiz",
    schema: questionsSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to generate quiz. Please try again.");
      setIsLocalLoading(false);
    },
    onFinish: ({ object }) => {
      console.log("object", object);
      setQuestions(object ?? []);
      setIsLocalLoading(false);
    },
  });

  const generateQuestions = async (files: File[]) => {
    if (!files) {
      toast.error("No files selected.");
      return;
    }

    setIsLocalLoading(true);

    try {
      const encodedFiles = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await encodeFileAsBase64(file),
        }))
      );

      submit({ files: encodedFiles });
      const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
      setTitle(generatedTitle);
    } catch (error) {
      console.error("Error encoding files:", error);
      toast.error("Failed to process files. Please try again.");
    } finally {
      setIsLocalLoading(false);
    }
  };

  const loadExamplePdf = async () => {
    try {
      const response = await fetch("/example.pdf");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch example.pdf: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const file = new File([blob], "example.pdf", {
        type: "application/pdf",
      });

      generateQuestions([file]);
    } catch (error) {
      console.error("Error loading example PDF:", error);
      toast.error("Failed to load example PDF. Please try again.");
      setIsLocalLoading(false);
    }
  };

  const clearPDF = () => {
    setQuestions([]);
  };

  // Load example.pdf from public folder on component mount
  useEffect(() => {
    loadExamplePdf();
  }, []);

  const progress = partialQuestions ? (partialQuestions.length / 4) * 100 : 0;

  if (isLoading || questions.length === 0) {
    return (
      <PageWrapper variant="quiz">
        <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto">
          <div className="text-sm">Generating quiz from example.pdf...</div>

          <div className="flex flex-col items-center justify-center space-y-4 w-full">
            <Loader2 className="h-10 w-10 animate-spin text-icon" />
            <Progress value={progress} className="w-full" />
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper variant="quiz">
      <Quiz title={title ?? "Quiz"} questions={questions} clearPDF={clearPDF} />
    </PageWrapper>
  );
}
