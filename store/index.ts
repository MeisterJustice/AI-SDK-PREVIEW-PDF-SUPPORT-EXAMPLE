"use client";
import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./app";
import quizReducer from "./quiz";
import flashcardsReducer from "./flashcards";
import matchReducer from "./match";

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    quiz: quizReducer,
    flashcards: flashcardsReducer,
    match: matchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
