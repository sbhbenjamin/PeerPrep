import React from "react";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="flex min-h-screen items-center ">
      <div className=" mx-auto mt-10 flex h-full flex-col-reverse items-center gap-6 space-y-0 px-6 md:flex-row md:gap-10 md:space-y-6">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h1 className="max-w-md text-center text-3xl font-bold  md:text-left md:text-4xl">
            The Ultimate Guide to Acing Tech Interviews
          </h1>
          <p className="max-w-sm text-center  md:text-left md:text-2xl">
            Prepare with confidence, perform with excellence, and land your
            ideal tech role.
          </p>
          <div className="flex justify-center gap-4 md:justify-start">
            <Button>Start Now</Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src="/peerpreplogo.svg" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
