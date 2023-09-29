import { User, UserWithoutId } from '@/app/users/types/user.type';
import { createAsyncThunk } from '@reduxjs/toolkit';

const USERS_MICROSERVICE_URL = process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL;


// TODO : Change to UserCreation to take in null values instead
export const createUser = createAsyncThunk('user/createUser', async (userData : UserWithoutId, thunkAPI) => {
    try {
        const apiUrl = `${USERS_MICROSERVICE_URL}/user/createUser`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      return response;
    } catch (error) {
      throw error;
    }
  });