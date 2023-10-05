"use client";

import UserProfileForm from "../components/UserProfileForm";

const page = ({ params }: { params: { id: number } }) => (
  <div className="flex justify-center">
    <div className="w-full max-w-screen-xl">
      <UserProfileForm userId={params.id} />
    </div>
  </div>
);

export default page;
