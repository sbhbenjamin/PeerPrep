import type { User } from "@/app/users/types/user.type";

export type AuthenticationDetails = {
  currentUser: User | null;
  image: string | null;
  sessionToken: string | null;
  isLoggedIn: Boolean;
};
