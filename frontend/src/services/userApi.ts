import { rootApi } from "@/app/RootApi.ts";

import type { User } from "@/features/users";

rootApi.enhanceEndpoints({ addTagTypes: ["User"] });

const userApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query<User, number>({
      query: (id) => ({ url: `user/${id}` }),
      // @ts-expect-error
      providesTags: ["User"],
    }),
    getUserByEmail: build.query<User, string>({
      query: (email) => `/user?email=${email}`,
    }),
    createUser: build.mutation<User, Omit<User, "id">>({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: `user/${userData.id}`,
        method: "PUT",
        body: userData,
      }),
      // @ts-expect-error
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<void, number>({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "DELETE",
      }),
      // @ts-expect-error
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
