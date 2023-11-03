"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

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

  const dispatchSignInOrRedirect = async () => {
    try {
      if (session && session.currentUser) {
        const sessionToken = await fetchSessionToken();
        dispatch(
          sessionSignIn({
            currentUser: session.currentUser,
            image: session.user?.image || null,
            sessionToken,
            isLoggedIn: true,
          }),
        );
      }
      if (session && session.currentUser == null) {
        router.push("/onboarding");
      }
    } catch (e) {
      toast.error("Unable to fetch token");
    }
  };

  useEffect(() => {
    dispatchSignInOrRedirect();
  }, [session, dispatch, router]);

  return children;
};

export default AuthenticationLayer;
