"use client";

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import { selectAuthData } from "@/features/auth";

import LoginButton from "./LoginButton";
import ModeToggle from "./ThemeToggle";
import UserDropDownMenu from "./UserDropDownMenu";

export const Navbar = () => {
  const auth = useSelector(selectAuthData);
  return (
    <div className="flex flex-row justify-between">
      <Link className="text-center text-lg font-black" href="/">
        PeerPrep
      </Link>
      <div className="flex gap-10">
        <ModeToggle />
        <div>{auth.isLoggedIn ? <UserDropDownMenu /> : <LoginButton />}</div>
      </div>
    </div>
  );
};
