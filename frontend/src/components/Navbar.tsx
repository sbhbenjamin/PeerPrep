"use client";

import React from "react";
import { useSelector } from "react-redux";

import UserDropDownMenu from "./UserDropDownMenu";
import { selectAuthData } from "@/app/auth/state/AuthSelector";
import RegistrationModal from "@/app/registration/components/RegistrationModal";

const Navbar = () => {
  const auth = useSelector(selectAuthData);

  return (
    <div className="flex flex-row justify-between">
      <div className="font-black">PeerPrep</div>
      <div className="flex gap-10">
        {auth.isLoggedIn ? <UserDropDownMenu /> : <RegistrationModal />}
      </div>
    </div>
  );
};

export default Navbar;
