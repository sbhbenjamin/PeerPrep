import { rootApi } from "../../RootApi.ts";

import type { User } from "@/app/users/types/user.type.ts";

rootApi.enhanceEndpoints({ addTagTypes: ["Auth"] });

const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getUserByEmail: build.query<User, string>({
      query: (email) => ({ url: `?email=${email}` }),
      // @ts-expect-error
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByEmailQuery } = authApi;
