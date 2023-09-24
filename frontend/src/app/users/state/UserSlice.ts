import { User } from "../types/user.type";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {createUser}  from '../state/UserAsyncCalls'
import { boolean } from "zod";
import { stat } from "fs";

const initialState: User = {name: 'Hi', email: 'ang.weijun1999@gmail.com'}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        // Should do something
        console.log("Pending", state)
      })
      .addCase(createUser.fulfilled, (state, action) => {
        // Should do something
        console.log("Fulfilled", state)
      })
      .addCase(createUser.rejected, (state, action) => {
        // Should do something
        console.log("Rejected", state)
      });
  },
});

// Export the action creators
export const { updateUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
