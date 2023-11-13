"use client";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

const page = () => {
  const message = useSearchParams().get("message");

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-8">
      <svg />
      <h1 className="text-4xl font-semibold">Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      <p>{message}</p>
      <div>
        <Button>Back</Button>
        <Button>Return Home</Button>
      </div>
    </div>
  );
};

export default page;
