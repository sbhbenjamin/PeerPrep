import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";

import { signIn } from "@/features/auth";

const HeroSection = () => {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch(signIn());
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center ">
      <div className=" mx-auto mt-10 flex h-full w-full flex-col-reverse items-center gap-10 space-y-0 px-6 md:flex-row md:gap-12 md:space-y-6">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h1 className="max-w-md text-center text-3xl font-bold  md:text-left md:text-4xl">
            The Ultimate Guide to Acing Tech Interviews
          </h1>
          <p className="max-w-sm text-center  md:text-left md:text-2xl">
            Prepare with confidence, perform with excellence, and land your
            ideal tech role.
          </p>
          <div className="flex justify-center gap-4 md:justify-start">
            <Button onClick={handleSignIn}>Start Now</Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src="/splash.svg" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
