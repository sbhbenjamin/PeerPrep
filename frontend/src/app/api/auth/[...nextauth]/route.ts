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
    async session({ session }) {
      try {
        const users = await fetch(
          `${process.env.NEXT_PUBLIC_USERS_MICROSERVICE_URL}/user?email=${session.user?.email}`,
        ).then((res) => res.json());
        return {
          ...session,
          currentUser: users && users[0],
        };
      } catch (error) {
        return session;
      }
    },
    async signIn() {
      return true;
    },
  },
});

export { handler as GET, handler as POST };
