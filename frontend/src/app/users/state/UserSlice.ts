import { User } from "../types/user.type";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData}  from './UserAsyncOperations'
import { boolean } from "zod";
import { stat } from "fs";

const initialState: User = {name: '', email: ''}

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
    .addCase(fetchUserData.pending, (state) => {
        //TODO Loader
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        // TODO Error
      });
  },
});

// Export the action creators
export const { updateUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
