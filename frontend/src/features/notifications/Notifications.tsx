"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

import { NotificationType, pop } from "./state/notificationsSlice";

import type { RootState } from "@/app/store";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.internal.notifications.queue,
  );

  useEffect(() => {
    if (notifications.length > 0) {
      const currentNotification = notifications[0];

      switch (currentNotification.type) {
        case NotificationType.SUCCESS:
          toast.success(currentNotification.value);
          break;
        case NotificationType.ERROR:
          toast.error(currentNotification.value);
          break;
        default:
          toast(currentNotification.value);
      }

      dispatch(pop());
    }
  }, [notifications, dispatch]);
  return <Toaster position="top-center" richColors />;
};

export default Notifications;
