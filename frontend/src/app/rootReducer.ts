import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './users/state/UserSlice';
import onboardingReducer from './onboarding/state/OnboardingSlice';

const rootReducer = combineReducers({
    user: userReducer,
    onboarding: onboardingReducer
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  
  export default rootReducer;
