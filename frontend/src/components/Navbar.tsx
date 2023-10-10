"use client";

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import UserDropDownMenu from "./UserDropDownMenu";
import { selectAuthData } from "@/app/auth/state/AuthSelector";
import RegistrationModal from "@/app/registration/components/RegistrationModal";

const Navbar = () => {
  const auth = useSelector(selectAuthData);

  return (
    <div className="flex flex-row justify-between">
      <Link className="text-center text-lg font-black" href="/">
        Peer Prep
      </Link>
      <div className="flex gap-10">
        {auth.isLoggedIn ? <UserDropDownMenu /> : <RegistrationModal />}
      </div>
    </div>
  );
};

export default Navbar;
