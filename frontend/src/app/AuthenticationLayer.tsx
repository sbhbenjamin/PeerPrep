import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, signOut } from "./auth/state/AuthSlice";

type Props = {
  children?: React.ReactNode;
};

const AuthenticationLayer = ({ children }: Props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      dispatch(
        login({
          currentUser: {
            name: session.user?.name!,
            email: session.user?.email!,
            bio: null,
            url: null,
          },
          sessionToken: null,
          isLoggedIn: true,
        })
      );
    } else {
      dispatch(signOut());
    }
  }, [session]);
  console.log(session);

  return <html>{children}</html>;
};

export default AuthenticationLayer;
