import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ClIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Check if there is a user
      try {
        if (user) {
          const res = await fetch(
            `http://${process.env.NEXT_PUBLIC_SERVICE_USER_URL}/user?email=${user.email}`,
          );
          const registeredUser = await res.json();
          token.role = registeredUser[0]["role"];
          token.userId = registeredUser[0]["id"];
        }
        return token;
      } catch (error) {
        console.log(error.message);
      }
      return token;
    },
    async session({ session }) {
      try {
        const res = await fetch(
          `http://${process.env.NEXT_PUBLIC_SERVICE_USER_URL}/user?email=${session.user?.email}`,
        );
        const users = await res.json();
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
