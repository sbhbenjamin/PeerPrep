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
  queue: Array<NotificationPayload>;
};

const initialState: NotificationState = {
  queue: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    push: (state, action: PayloadAction<NotificationPayload>) => {
      state.queue.push(action.payload);
    },
    pop: (state) => {
      if (state.queue.length > 0) {
        state.queue.shift();
      }
    },
  },
});

export const { push, pop } = notificationsSlice.actions;

export default notificationsSlice.reducer;
