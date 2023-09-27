import { createAsyncThunk } from '@reduxjs/toolkit';

const USERS_MICROSERVICE_URL = process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL;

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


