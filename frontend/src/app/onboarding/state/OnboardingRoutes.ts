import { rootApi } from "../../RootApi.ts";

import type { User, UserWithoutId } from "@/app/users/types/user.type.ts";
import {
  NotificationType,
  set,
} from "@/features/notifications/state/notificationsSlice.ts";

const onboardingApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<User, UserWithoutId>({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
      async onCacheEntryAdded(arg, { dispatch }) {
        const notificationPayload = {
          type: NotificationType.SUCCESS,
          value: "Successfully updated profile",
        };
        dispatch(set(notificationPayload));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateUserMutation } = onboardingApi;
