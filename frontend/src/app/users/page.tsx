import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UserProfileForm from './components/UserProfileForm';

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <h1 className="mb-8 flex text-3xl font-bold">Profile Page</h1>
        <UserProfileForm />
      </div>
    </div>
  );
};

export default page;
