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
        <Suspense fallback={<p>Loading</p>}>
          <UserProfileForm userId={params.id} />ß
        </Suspense>
      </div>
    </div>
  );
};

export default page;
