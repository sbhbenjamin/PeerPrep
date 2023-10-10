import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { selectAuthData } from "@/app/auth/state/AuthSelector";
import { signOut } from "@/app/auth/state/AuthSlice";

const UserDropDownMenu = () => {
  const auth = useSelector(selectAuthData);
  const dispatch = useDispatch();

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
        <DropdownMenuItem onClick={() => dispatch(signOut())}>
          SignOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
