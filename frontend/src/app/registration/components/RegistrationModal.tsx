"user client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Mail } from "lucide-react";
import { Icons } from "@/components/ui/icons";

const RegistrationModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Login</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-2xl mb-8 w-1/2">
          Login to PeerPrep
        </AlertDialogHeader>
        <Button>
          <Icons.google className="mr-2 h-4 w-4" />
          Login via Google
        </Button>
        <Button
          onClick={() => {
            signIn("github");
          }}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Login via Github
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegistrationModal;
