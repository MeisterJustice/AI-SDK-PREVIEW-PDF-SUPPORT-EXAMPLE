import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MatchItem } from "./schema";

export interface MatchState {
  items: MatchItem[];
  loading: boolean;
}

const initialState: MatchState = {
  items: [],
  loading: false,
};

export const matchReducer = createSlice({
  name: "match",
  initialState,
  reducers: {
    setMatchItems(state, action: PayloadAction<MatchItem[]>) {
      state.items = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setMatchItems, setLoading } = matchReducer.actions;

export default matchReducer.reducer;
