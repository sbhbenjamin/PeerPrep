import { Input } from '@/components/ui/input';
import UserForm from './components/UserForm';

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <h1 className="mb-8 flex text-3xl font-bold">User Profile</h1>
        <UserForm />
        <UserForm />
      </div>
    </div>
  );
};

export default page;
