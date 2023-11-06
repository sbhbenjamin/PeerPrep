"use client";

import React from "react";

import UserTable from "@/features/users/components/UserTable";

import { useGetUsersQuery } from "@/services/userApi";

const page = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <UserTable data={users!} />
    </div>
  );
};

export default page;
