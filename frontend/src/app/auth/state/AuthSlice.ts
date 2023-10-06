import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AuthenticationDetails } from "../types/authentication.types";

const initialState: AuthenticationDetails = {
  currentUser: null,
  image: null,
  sessionToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticationDetails>) =>
      action.payload,
    signOut: (state) => ({
      currentUser: null,
      image: null,
      sessionToken: null,
      isLoggedIn: false,
    }),
  },
});

export const { signOut, login } = authSlice.actions;

export default authSlice.reducer;
