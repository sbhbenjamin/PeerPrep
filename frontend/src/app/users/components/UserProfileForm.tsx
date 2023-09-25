'use client';

import React, { use, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserSchema } from '../types/user.schema';
import * as z from 'zod';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData } from '../state/UserSelectors';
import { User } from '../types/user.type';

function UserProfileForm() {
  const user = useSelector(selectUserData);
  const [userData, setUserData] = useState<User>(user);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: userData,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserSchema>) {
    console.log(values);
  }

  return (
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
                This is your public display name. Please avoid putting your real
                name!
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default UserProfileForm;
