import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user.type';

const USERS_MICROSERVICE_URL = process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL;

export const createUser = createAsyncThunk('user/crseateUser', async (userData : User, thunkAPI) => {
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

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string) => {
    const apiUrl = `${USERS_MICROSERVICE_URL}/api/users/${userId}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);


