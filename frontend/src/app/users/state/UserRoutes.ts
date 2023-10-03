import {rootApi} from '../../RootApi.ts'
import { User } from '../types/user.type.ts'

const userApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (id) => ({url: `user/id/${id}`})
    }),
    updateUser: build.mutation<User, Partial<User>>({
        query: (userData) => ({
        url: `user/id/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
    deleteUser: build.mutation<void, number>({
      query: (userId) => ({
        url: `user/id/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
  
  overrideExisting: false,
})

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi