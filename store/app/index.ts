import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  files: File[];
  showFileSelector: boolean;
}

const initialState: AppState = {
  files: [],
  showFileSelector: true,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowFileSelector(state, action: PayloadAction<boolean>) {
      state.showFileSelector = action.payload;
    },

    setFiles(state, action: PayloadAction<File[]>) {
      state.files = [...action.payload];
    },
  },
});

export const { setShowFileSelector, setFiles } = appReducer.actions;

export default appReducer.reducer;
