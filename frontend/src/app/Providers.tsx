"use client";

import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import store from "./store.ts";
import AuthenticationLayer from "./AuthenticationLayer.tsx";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <AuthenticationLayer>{children}</AuthenticationLayer>
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
