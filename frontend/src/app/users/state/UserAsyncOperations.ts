import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user.type';

const USERS_MICROSERVICE_URL = process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL;

export const fetchUser = async (id: number) => {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL}/user/id/${id}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("No such User");
    }
    return res.json();
  });
  return user;
};

export const updateUser = async (user: User) => {
    console.log("🚀 ~ file: UserAsyncOperations.ts:19 ~ updateUser ~ user:", user)
    const apiUrl = `${USERS_MICROSERVICE_URL}/user/id/${user.id}`;
    const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then((res) => {
    if (!res.ok) {
      throw new Error("No such User");
    }
    return res.json();
  });
  return res;
}


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



