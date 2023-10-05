import type { UserWithoutId } from "@/app/users/types/user.type";

export type AuthenticationDetails = {
  currentUser: UserWithoutId | null;
  sessionToken: string | null;
  isLoggedIn: Boolean;
};
