"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

import { NotificationType, reset } from "./state/notificationsSlice";

import type { RootState } from "@/app/store";

const Notifications = () => {
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.internal.notifications.value,
  );

  useEffect(() => {
    if (notification) {
      switch (notification.type) {
        case NotificationType.SUCCESS:
          toast.success(notification.value);
          break;
        case NotificationType.ERROR:
          toast.error(notification.value);
          break;
        default:
          toast(notification.value);
      }

      dispatch(reset());
    }
  }, [notification, dispatch]);
  return <Toaster position="top-center" richColors />;
};

export default Notifications;
