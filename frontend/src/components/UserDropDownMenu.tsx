import React from "react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserDropDownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button>User</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>User</DropdownMenuItem>
      <DropdownMenuItem>User</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>SignOut</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserDropDownMenu;
