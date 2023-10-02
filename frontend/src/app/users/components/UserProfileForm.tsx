"use client";

import React, { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "../types/user.schema";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { fetchUser, updateUser } from "../state/UserAsyncOperations";
import ConfirmEditDialog from "./ConfirmEditDialog";
import { Alert } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";
import { AppDispatch } from "@/app/store";
import { User } from "../types/user.type";
import { revalidatePath } from "next/cache";
import { useMutation, useQuery, useQueryClient } from "react-query";

function UserProfileForm({ userId }) {
  const queryClient = useQueryClient();
  const mutateClient = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries("user"),
  });

  const { data } = useQuery(["user", userId], () => fetchUser(userId));
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    values: data,
  });

  function onSubmit(values: z.infer<typeof UserSchema>) {
    console.log("Running");
    mutateClient.mutate({ id: userId, ...values });
    console.log("Running");
  }

  function deleteUserAccount() {
    console.log("Delete");
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <div className="flex flex-row justify-between">
          <h1 className="mb-8 flex text-2xl">Profile Page</h1>
          <Button
            onClick={() => {
              setIsDisabled(!isDisabled);
            }}
          >
            Edit
          </Button>
        </div>
        <Form {...form}>
          <form
            className="space-y-8 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="This is your public display name."
                      disabled={isDisabled}
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
                    <Input
                      placeholder="https://example.com"
                      disabled={isDisabled}
                      {...field}
                    />
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
                    <Textarea disabled={isDisabled} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {isDisabled ? <></> : <Button type="submit">Submit</Button>}
            <Button type="button" onClick={deleteUserAccount}>
              Delete
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UserProfileForm;
