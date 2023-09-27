"use client";
import RegistrationModal from "@/app/registration/components/RegistrationModal";
import React from "react";

const Navbar = () => (
  <div className="flex flex-row justify-between">
    <div className="font-black">PeerPrep</div>
    <div className="flex gap-10">
      <RegistrationModal />
    </div>
  </div>
);

export default Navbar;
