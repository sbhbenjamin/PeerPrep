"use client";

import React, { FC, Suspense, useEffect, useState } from "react";
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
import { User, UserWithOptionalUrlAndBio } from "../types/user.type";
import { revalidatePath } from "next/cache";
import { useMutation, useQuery, useQueryClient } from "react-query";
import page from "../[id]/page";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../state/UserRoutes";

function UserProfileForm({ userId }: { userId: number }) {
  const { data: user, isLoading, isError } = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  if (isError) {
    throw new Error("No such User");
  }

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    values: user,
  });

  function onSubmit(values: z.infer<typeof UserSchema>) {
    updateUser({ id: userId, ...values });
  }

  function deleteUserAccount() {
    deleteUser(userId);
  }

  return (
    <div className="flex justify-center content-center w-full">
      <div className="w-full">
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
            className="space-y-3 flex flex-col"
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
            {isDisabled ? (
              <Button type="button" onClick={deleteUserAccount}>
                Delete User
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UserProfileForm;
