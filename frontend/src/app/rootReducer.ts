import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './users/state/UserSlice';

const rootReducer = combineReducers({
    user: userReducer,
    // ... add other feature reducers as needed
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  
  export default rootReducer;
