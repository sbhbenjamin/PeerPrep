"use client";

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import LoginButton from "./LoginButton";
import UserDropDownMenu from "./UserDropDownMenu";
import { selectAuthData } from "@/features/auth";

export const Navbar = () => {
  const auth = useSelector(selectAuthData);

  return (
    <div className="flex flex-row justify-between">
      <Link className="text-center text-lg font-black" href="/">
        PeerPrep
      </Link>
      <div className="flex gap-10">
        {auth.isLoggedIn ? <UserDropDownMenu /> : <LoginButton />}
      </div>
    </div>
  );
};
