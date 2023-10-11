import { signOut as NextSignOut } from "next-auth/react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AuthenticationDetails } from "../types/authentication.types";

import type { User } from "@/app/users/types/user.type";

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
    sessionLogin: (state, action: PayloadAction<AuthenticationDetails>) =>
      action.payload,
    signOut: () => {
      NextSignOut({ callbackUrl: "/" });
      return {
        currentUser: null,
        image: null,
        sessionToken: null,
        isLoggedIn: false,
      };
    },
    register: (state, action: PayloadAction<User>) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
});

export const { signOut, sessionLogin, register } = authSlice.actions;

export default authSlice.reducer;
