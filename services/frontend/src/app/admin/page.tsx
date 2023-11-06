"use client";

import React from "react";

import type { User } from "@/features/users";
import UserTable from "@/features/users/components/UserTable";

const data: User[] = [
  {
    id: 2,
    name: "WeiJun",
    email: "ang.weijun1999@gmail.com",
    role: "Used",
    url: null,
    bio: "Hi",
  },
];

const page = () => {
  return (
    <div>
      <UserTable data={data} />
    </div>
  );
};

export default page;
