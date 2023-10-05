"user client";

import { signIn } from "next-auth/react";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

const RegistrationModal = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button>Login</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader className="mb-8 w-1/2 text-2xl">
        Login to PeerPrep
      </AlertDialogHeader>
      <Button>
        <Icons.GOOGLE className="mr-2 h-4 w-4" />
        Login via Google
      </Button>
      <Button
        onClick={() => {
          signIn("github");
        }}
      >
        <Icons.GITHUB className="mr-2 h-4 w-4" />
        Login via Github
      </Button>
    </AlertDialogContent>
  </AlertDialog>
);

export default RegistrationModal;
