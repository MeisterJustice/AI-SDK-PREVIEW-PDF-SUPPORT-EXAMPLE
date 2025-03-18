import { z } from "zod";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { questionsSchema } from "./schema";

export interface QuizState {
  loading: boolean;
  questions: z.infer<typeof questionsSchema>;
  title: string;
}

const initialState: QuizState = {
  loading: false,
  questions: [],
  title: "",
};

export const quizReducer = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setQuestions(
      state,
      action: PayloadAction<z.infer<typeof questionsSchema>>
    ) {
      state.questions = [...action.payload];
    },

    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const { setLoading, setQuestions, setTitle } = quizReducer.actions;

export default quizReducer.reducer;
