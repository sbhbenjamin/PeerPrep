"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { CreateUserSchema } from "../types/onboarding.schema";
import { useDispatch } from "react-redux";
import { createUser } from "../state/OnboardingAsyncCalls";

const OnboardingCard = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    values: {
      name: session?.user?.name!,
      email: session?.user?.email!,
      url: null,
      bio: null,
    },
  });

  function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    dispatch(createUser(values));
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    return <h1>Login</h1>;
  } else {
    return (
      <Card className="p-6 w-3/8">
        <Button
          onClick={() => {
            console.log(form.getValues());
          }}
        ></Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="This is your public display name."
                      defaultValue={session?.user?.name || ""}
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
                    <Input
                      disabled
                      defaultValue={session?.user?.email || ""}
                      {...field}
                    />
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
                    <Input placeholder="https://example.com" {...field} />
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
                    <Textarea {...field} />
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
  }
};

export default OnboardingCard;
