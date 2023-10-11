"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { sessionLogin } from "./auth/state/AuthSlice";

type Props = {
  children?: React.ReactNode;
};

const AuthenticationLayer = ({ children }: Props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      dispatch(
        sessionLogin({
          currentUser: session.currentUser,
          image: session.user?.image || null,
          sessionToken: null,
          isLoggedIn: true,
        }),
      );

      if (session.currentUser == null) {
        router.push("/onboarding");
      }
    }
  }, [session, dispatch, router]);

  return children;
};

export default AuthenticationLayer;
