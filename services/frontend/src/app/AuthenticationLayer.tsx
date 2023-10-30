"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { sessionSignIn } from "@/features/auth";

type Props = {
  children?: React.ReactNode;
};

const AuthenticationLayer = ({ children }: Props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchSessionToken = async () => {
    const response = await fetch("http://localhost:3000/api/me");
    return response.json();
  };

  useEffect(() => {
    const authenticator = async () => {
      if (session) {
        dispatch(
          sessionSignIn({
            currentUser: session.currentUser,
            image: session.user?.image || null,
            sessionToken: await fetchSessionToken(),
            isLoggedIn: true,
          }),
        );

        if (session.currentUser == null) {
          router.push("/onboarding");
        }
      }
    };
    authenticator();
  }, [session, dispatch, router]);

  return children;
};

export default AuthenticationLayer;
