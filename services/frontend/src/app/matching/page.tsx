/* eslint-disable tailwindcss/no-custom-classname */

"use client";

import { MatchingForm } from "@/features/matching/components/MatchingForm";
import type { MatchRequest } from "@/features/matching/types/matching.type";

const page = () => {
  const handleMatching = (request: MatchRequest) => {
    console.log(request);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <h1 className="mb-8 flex text-3xl font-bold">
          Peerprep Partner Search
        </h1>
        <div className="flex gap-8">
          <div className="w-1/2">
            <h1 className="mb-8 flex text-2xl">Find a session</h1>
            <MatchingForm onSubmit={handleMatching} matchPending={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
