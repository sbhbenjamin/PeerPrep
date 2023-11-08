/* eslint-disable no-param-reassign */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { MatchDetails } from "..";

const initialState: MatchDetails = {
  question: undefined,
  roomId: undefined,
  language: undefined,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    updateMatchDetails: (state, action: PayloadAction<MatchDetails>) => {
      state.language = action.payload.language;
      state.roomId = action.payload.roomId;
      state.question = action.payload.question;
    },
    resetMatchDetails: () => initialState,
  },
});

export const { resetMatchDetails, updateMatchDetails } = matchSlice.actions;
export const { reducer: matchReducer } = matchSlice;
