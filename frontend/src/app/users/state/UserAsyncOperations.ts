import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user.type';

const USERS_MICROSERVICE_URL = process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL;

export const fetchUserData = createAsyncThunk(
  'user/getUserData',
  async (userId: string) => {
    const apiUrl = `${USERS_MICROSERVICE_URL}/user/id/${userId}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.status == 404) {
      throw new Error('No such user');
    }
    const data = await response.json();
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (userData: User) => {
    try {
        const apiUrl = `${USERS_MICROSERVICE_URL}/user/id/${userData.id}`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: number) => {
    try {
        const apiUrl = `${USERS_MICROSERVICE_URL}/user/id/${userId}`;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);



