import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/state/AuthSlice";
import onboardingReducer from "./onboarding/state/OnboardingSlice";
import userReducer from "./users/state/UserSlice";

const rootReducer = combineReducers({
  user: userReducer,
  onboarding: onboardingReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
