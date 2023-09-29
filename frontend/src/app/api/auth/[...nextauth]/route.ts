import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: "485e43506fbb5aa04d09",
      clientSecret: "c72469946a1dd8266c8c3b21da0c936a5b34457f",
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
    if (account?.provider === "github" && profile?.email) {
        const res = await fetch(`http://localhost:2000/user/email/${profile?.email}`)
        if (!res.ok) {
          new Error("Something went wrong")
        }
        if (res.status != 200) {
          return '/onboarding'
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
