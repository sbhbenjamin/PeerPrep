import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      const path = req.nextUrl.pathname;

      const userOnlyPaths = ["/home", "/matching", "/onboarding", "/collab"];

      if (token && token.role === "ADMIN") {
        return true;
      }

      if (token && userOnlyPaths.some((p) => path.startsWith(p))) {
        return true;
      }

      // Check if the path is public.
      return false;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
});

export const config = {
  matcher: [
    "/admin",
    "/collab",
    "/home",
    "/matching",
    "/onboarding",
    "/questions",
  ],
};
