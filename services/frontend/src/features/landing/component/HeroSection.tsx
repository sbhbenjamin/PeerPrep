import React from "react";

const HeroSection = () => {
  return (
    <div className="flex min-h-screen items-center bg-white p-8 md:p-16">
      <div className=" mx-auto mt-10 flex h-full flex-col-reverse items-center gap-6 space-y-0 px-6 md:flex-row md:gap-7 md:space-y-6">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h1 className="max-w-md text-center text-3xl font-bold text-black md:text-left md:text-4xl">
            The Ultimate Guide to Acing Tech Interviews
          </h1>
          <p className="text-md max-w-sm text-center text-gray-600 md:text-left md:text-2xl">
            Prepare with confidence, perform with excellence, and land your
            ideal tech role.
          </p>
          <div className="flex justify-center gap-4 md:justify-start">
            <a
              href="/"
              className=" md:text-md  rounded-full p-3 text-sm text-black"
            >
              Start Preparing
            </a>
            <a
              href="/"
              className=" md:text-md rounded-full border border-black p-3 text-sm text-black"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src="peer-prep.jpg" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
