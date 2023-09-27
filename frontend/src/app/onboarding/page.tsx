import React from 'react';
import LoginInForm from './components/LoginForm';
import OnboardingCard from './components/OnboardingCard';

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-6">Onboarding</h1>
      <OnboardingCard />
    </div>
  );
};

export default page;
