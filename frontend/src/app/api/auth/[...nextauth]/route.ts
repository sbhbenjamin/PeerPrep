import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ClIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "github" && profile?.email) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL}/user/email/${profile?.email}`,
        );
        if (res.status != 202) {
          return "/onboarding";
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
