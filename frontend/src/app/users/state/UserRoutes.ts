import { rootApi } from "../../RootApi.ts";
import type { User } from "../types/user.type.ts";

import {
  NotificationType,
  set,
} from "@/features/notifications/state/notificationsSlice.ts";

rootApi.enhanceEndpoints({ addTagTypes: ["User"] });

const userApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (id) => ({ url: `user/${id}` }),
      // @ts-expect-error
      providesTags: ["User"],
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: `user/${userData.id}`,
        method: "PUT",
        body: userData,
      }),
      // @ts-expect-error
      invalidatesTags: ["User"],
      async onCacheEntryAdded(_, { dispatch }) {
        const notificationPayload = {
          type: NotificationType.SUCCESS,
          value: "Successfully updated profile",
        };
        dispatch(set(notificationPayload));
      },
    }),
    deleteUser: build.mutation<void, number>({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "DELETE",
      }),
      // @ts-expect-error
      invalidatesTags: ["User"],
      async onCacheEntryAdded(_, { dispatch }) {
        const notificationPayload = {
          type: NotificationType.SUCCESS,
          value: "Successfully deleted user",
        };
        dispatch(set(notificationPayload));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } =
  userApi;
