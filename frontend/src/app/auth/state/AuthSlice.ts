import { User } from '@/app/users/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthenticationDetails } from '../types/authentication.types';

const initialState: AuthenticationDetails = {currentUser: null, sessionToken: null, isLoggedIn: false}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticationDetails>) => {
      state.currentUser = action.payload.currentUser;
      state.sessionToken = action.payload.sessionToken;
      state.isLoggedIn = true;
    },
    signOut: (state) => {
        state.currentUser = null,
        state.sessionToken = null,
        state.isLoggedIn = false
    }
  },
});

export const { signOut, login} = authSlice.actions;

export default authSlice.reducer;
