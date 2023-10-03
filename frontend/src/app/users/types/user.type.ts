export type User  = {
    id: number;
    name: string;
    email: string;
    url: string | null;
    bio: string | null;
}

export type UserWithOptionalUrlAndBio = Omit<User, 'url' | 'bio'> & Partial<Omit<Pick<User, "url" | "bio">, 'null'>>;

export type UserWithoutId = Omit<User, 'id'>;
