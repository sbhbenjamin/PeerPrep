import { User } from '@/app/users/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: User = { id: 0, name: '', email: ''}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { updateCurrUser } = authSlice.actions;

export default authSlice.reducer;
