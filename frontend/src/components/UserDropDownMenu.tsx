import { Archive, LogOut, UserSquare2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { selectAuthData } from "@/app/auth/state/AuthSelector";
import { signOut } from "@/app/auth/state/AuthSlice";

const UserDropDownMenu = () => {
  const auth = useSelector(selectAuthData);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={auth.image} />
          <AvatarFallback>{auth?.currentUser?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 py-5">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {auth.currentUser !== null && (
          <>
            <DropdownMenuItem className="gap-4">
              <UserSquare2 size={15} />
              <Link href={`/users/${auth?.currentUser?.id}`}>Profile page</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-4">
              <Archive size={15} />
              <Link href={`/users/${auth?.currentUser?.id}`}>History</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4" onClick={() => dispatch(signOut())}>
          <LogOut size={15} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
