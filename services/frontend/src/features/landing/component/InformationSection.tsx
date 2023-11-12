import React from "react";

export const InformationSection = () => {
  return (
    <div className="max-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Elevate Your Interview Prep Experience
          </p>
          <p className="mt-6 text-lg leading-8 ">
            Elevate Your Interview Prep Experience with our comprehensive
            question database, intelligent matching system, realistic interview
            simulations, and instant performance analysis.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt
                className="text-base font-semibold leading-7
              "
              >
                Unlock Our Extensive Question Database
              </dt>
              <p className="mt-2 text-base leading-7 ">
                Explore our comprehensive question database, tailored to cover a
                wide range of technical interview categories and varying levels
                of difficulty.
              </p>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 ">
                Smart Matching by Category and Difficulty
              </dt>
              <p className="mt-2 text-base leading-7 ">
                Our intelligent matching system pairs you with interview
                questions based on your preferences. Select from various
                question categories and difficulty levels, and we will curate
                the perfect experience
              </p>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 ">
                Realistic Interview Experience
              </dt>
              <p className="mt-2 text-base leading-7 ">
                Experience the authenticity of real technical interviews with
                our chat-based communication feature. Engage in conversations
                with interviewers through our platform, simulating real
                interview scenarios.
              </p>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 ">
                Instant Feedback and Analysis
              </dt>
              <p className="mt-2 text-base leading-7 ">
                Receive immediate feedback and in-depth performance analysis
                after each interview session. Understand your strengths and
                areas for improvement. Focus your preparation where it matters
                most.
              </p>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
