export type User  = {
    id: number;
    name: string;
    email: string;
    url?: string | null;
    bio?: string | null;
  }

export type UserWithoutId = Omit<User, 'id'>;
