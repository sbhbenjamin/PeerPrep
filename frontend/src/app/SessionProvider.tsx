"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default NextAuthProvider;
