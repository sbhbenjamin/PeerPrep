import Link from "next/link";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { selectAuthData } from "@/app/auth/state/AuthSelector";

const UserDropDownMenu = () => {
  const auth = useSelector(selectAuthData);
  console.log(
    "🚀 ~ file: UserDropDownMenu.tsx:19 ~ UserDropDownMenu ~ auth:",
    auth,
  );

  useEffect(() => {}, [auth]);

  if (auth === null) {
    return <div>Not Signed In</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={auth.image} />
          <AvatarFallback>{auth?.currentUser?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/users/${auth?.currentUser?.id}`}>Profile Page</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          SignOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
