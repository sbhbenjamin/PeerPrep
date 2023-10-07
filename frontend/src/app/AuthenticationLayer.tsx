"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { login, signOut } from "./auth/state/AuthSlice";

type Props = {
  children?: React.ReactNode;
};

const AuthenticationLayer = ({ children }: Props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.currentUser === null) {
        router.push("/onboarding");
      }
      dispatch(
        login({
          currentUser: session.currentUser,
          image: session.user?.image || null,
          sessionToken: null,
          isLoggedIn: true,
        }),
      );
    } else {
      dispatch(signOut());
    }
  }, [session]);

  return children;
};

export default AuthenticationLayer;
