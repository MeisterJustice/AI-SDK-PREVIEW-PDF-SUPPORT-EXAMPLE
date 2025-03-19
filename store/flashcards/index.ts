import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Flashcard } from "./schema";

export interface FlashcardsState {
  flashcards: Flashcard[];
  loading: boolean;
}

const initialState: FlashcardsState = {
  flashcards: [],
  loading: true,
};

export const flashcardsReducer = createSlice({
  name: "flashcards",
  initialState,
  reducers: {
    setFlashcards(state, action: PayloadAction<Flashcard[]>) {
      state.flashcards = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setFlashcards, setLoading } = flashcardsReducer.actions;

export default flashcardsReducer.reducer;
