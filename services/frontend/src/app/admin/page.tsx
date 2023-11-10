"use client";

import React from "react";

import UserTable from "@/features/users/components/UserTable";

import { useGetUsersQuery } from "@/services/userApi";

const page = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <UserTable users={users!} />
    </div>
  );
};

export default page;
