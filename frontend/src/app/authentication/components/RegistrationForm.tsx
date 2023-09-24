'use client';

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
import React from 'react';

const RegistrationForm = () => {
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
          <Label>Email</Label>
          <Input placeholder="example@gmail.com" />
        </div>
        <div>
          <Label>Password</Label>
          <Input />
        </div>
        <div>
          <span>Or sign in with</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button>Google</Button>
          <Button>GitHub</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
