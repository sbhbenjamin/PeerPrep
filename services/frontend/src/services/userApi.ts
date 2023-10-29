import { rootApi } from "@/app/RootApi.ts";

import type { User } from "@/features/users";

rootApi.enhanceEndpoints({ addTagTypes: ["User"] });

const buildServiceUrl = (queryUrl: string) =>
  `${process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL}${queryUrl}`;

const userApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query<User, number>({
      query: (id) => ({ url: buildServiceUrl(`/user/${id}`) }),
      // @ts-expect-error
      providesTags: ["User"],
    }),
    getUserByEmail: build.query<User, string>({
      query: (email) => buildServiceUrl(`/user?email=${email}`),
    }),
    createUser: build.mutation<User, Omit<User, "id">>({
      query: (newUser) => ({
        url: buildServiceUrl("/user"),
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: buildServiceUrl(`/user/${userData.id}`),
        method: "PUT",
        body: userData,
      }),
      // @ts-expect-error
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<void, number>({
      query: (userId) => ({
        url: buildServiceUrl(`/user/${userId}`),
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
