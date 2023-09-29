import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

const ConfirmEditDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Confirm</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-2xl mb-8 w-1/2">
          Are you sure?
        </AlertDialogHeader>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction type="submit">Confirm</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmEditDialog;
