import { User } from "../types/user.type";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData, updateUserData}  from './UserAsyncOperations'

const initialState: User = { id: 0, name: '', email: ''}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder      
    .addCase(fetchUserData.pending, (state) => {
        // TODO Loader
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        // TODO Error
      })
      .addCase(updateUserData.pending, (state, action) => {
        // TODO Loader
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        // TODO Pending
      })
  },
});

// Export the reducer
export default userSlice.reducer;
