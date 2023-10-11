/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export enum NotificationType {
  INFO,
  SUCCESS,
  ERROR,
  LOADING,
}

export type NotificationPayload = {
  type: NotificationType;
  value: string;
};

export type NotificationState = {
  value: NotificationPayload | null;
};

const initialState: NotificationState = {
  value: null,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<NotificationPayload>) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { set, reset } = notificationsSlice.actions;

export default notificationsSlice.reducer;
