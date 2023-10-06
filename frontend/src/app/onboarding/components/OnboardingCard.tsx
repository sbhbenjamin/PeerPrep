"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateUserMutation } from "../state/OnboardingRoutes";
import { CreateUserSchema } from "../types/onboarding.schema";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const OnboardingCard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [createUser] = useCreateUserMutation();

  if (!session) {
    <div>Loading</div>;
  }

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: session?.user?.name!,
      email: session?.user?.email!,
      url: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (session) {
      form.setValue("name", session?.user?.name!);
      form.setValue("email", session?.user?.email!);
    }
  }, [session, form]);

  function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    createUser({
      ...values,
      bio: values.bio === "" ? null : values.bio,
      url: values.url === "" ? null : values.url,
    }).then((res) => {
      router.push(`/users/${res.data.id}`);
    });
  }

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <Card className=" p-6">
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
            <Button className="min-w-30" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default OnboardingCard;
