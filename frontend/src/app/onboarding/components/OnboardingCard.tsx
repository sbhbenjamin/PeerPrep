'use client';

import { UserSchema } from '@/app/users/types/user.schema';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../../users/types/user.type';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

const RegistrationForm = () => {
  // Ensure that the user is signIn and not in the database
  const [userData, setUserData] = useState<User>({
    name: 'weijun',
    email: 'ang.weijun1999@gmail.com',
  });

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: userData,
  });

  function onSubmit(values: z.infer<typeof UserSchema>) {
    console.log(values);
  }

  return (
    <Card className="p-6 w-3/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="This is your public display name."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name. Please avoid putting your
                  real name!
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription>
                  This is the email your account is associated with.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full gap-5">
            <Button className="ml-auto min-w-30">Skip</Button>
            <Button className="min-w-30">Submit</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
