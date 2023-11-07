import { combineReducers } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth";
import { matchReducer } from "@/features/match/state/matchSlice";
import { notificationsReducer } from "@/features/notifications";

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  auth: authReducer,
  match: matchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
