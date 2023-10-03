"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserProfileForm from "../components/UserProfileForm";
import { useQuery } from "react-query";
import { Suspense } from "react";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <UserProfileForm userId={params.id} />
      </div>
    </div>
  );
};

export default page;
