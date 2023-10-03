import { User, UserWithoutId } from '@/app/users/types/user.type.ts'
import {rootApi} from '../../RootApi.ts'

const onboardingApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<User, UserWithoutId>({
      query: (newUser) => ({
        url: '/user',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useCreateUserMutation} = onboardingApi