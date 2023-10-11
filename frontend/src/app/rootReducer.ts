import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/state/AuthSlice";
import onboardingReducer from "./onboarding/state/OnboardingSlice";
import userReducer from "./users/state/UserSlice";

import notificationReducer from "@/features/notifications/state/notificationsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  onboarding: onboardingReducer,
  auth: authReducer,
  notifications: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
