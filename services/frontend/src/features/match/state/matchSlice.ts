/* eslint-disable no-param-reassign */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { MatchDetails, MatchState } from "..";

const initialState: MatchState = {
  question: undefined,
  roomId: undefined,
  language: undefined,
  sessionEnded: false,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    updateMatchDetails: (state, action: PayloadAction<MatchDetails>) => {
      state.language = action.payload.language;
      state.roomId = action.payload.roomId;
      state.question = action.payload.question;
      state.sessionEnded = false;
    },
    updateSessionEnded: (state) => {
      state.sessionEnded = true;
    },
    resetMatchDetails: () => initialState,
  },
});

export const { resetMatchDetails, updateSessionEnded, updateMatchDetails } =
  matchSlice.actions;
export const { reducer: matchReducer } = matchSlice;
