"use client";

import { useSearchParams } from "next/navigation";

const page = () => {
  const message = useSearchParams().get("message");

  return (
    <div className=" h-full w-full bg-slate-100">
      <h1 className="text-4xl">Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      <p>{message}</p>
    </div>
  );
};

export default page;
