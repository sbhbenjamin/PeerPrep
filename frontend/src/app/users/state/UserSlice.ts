import { User } from "../types/user.type";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = { id: 0, name: '', email: '', bio: null, url: null}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  }
});

// Export the reducer
export default userSlice.reducer;
