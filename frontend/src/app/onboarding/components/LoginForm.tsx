'use client';

import { User } from '@/app/users/types/user.type';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Icon } from '@radix-ui/react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../state/RegistrationAsyncOperations';
import { signIn, signOut, useSession } from 'next-auth/react';

const LoginInForm = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
  });

  const dispatch = useDispatch();

  const registerUser = () => {
    //dispatch(createUser(user));
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardHeader className="text-2xl p-0">Create an account</CardHeader>
        <CardDescription>
          Enter your email below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <Label>Name</Label>
          <Input
            onChange={(value) => setUser({ ...user, name: value.target.value })}
            placeholder="This is your display name"
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            onChange={(value) =>
              setUser({ ...user, email: value.target.value })
            }
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input />
        </div>
        <Button>Register</Button>
        <div>
          <span>Or sign in with</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button>Google</Button>
          <Button onClick={() => signIn()}>GitHub</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginInForm;
