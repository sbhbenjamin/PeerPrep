"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserProfileForm from "../components/UserProfileForm";
import { useQuery } from "react-query";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <UserProfileForm userId={params.id} />
        {/* <div className="flex ml-auto">
          <Button className="ml-auto">Delete Profile</Button>
        </div> */}
      </div>
    </div>
  );
};

export default page;
