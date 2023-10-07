import { getPrismaClient } from "./prisma-client-factory";

type UserRecord = {
  id: number;
  email: string;
  name: string;
  image?: string | null;
};

export async function addUser(
  newUserRequest: Omit<UserRecord, "id">,
): Promise<UserRecord> {
  const resultUser = await getPrismaClient().user.create({
    data: { ...newUserRequest },
  });

  return resultUser;
}

export async function getAllUsers(): Promise<UserRecord[]> {
  const users = await getPrismaClient().user.findMany({});
  return users;
}

export async function getUserById(id: number): Promise<UserRecord | null> {
  const resultUser = await getPrismaClient().user.findUnique({
    where: {
      id,
    },
  });
  return resultUser;
}

export async function getUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  const user = await getPrismaClient().user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function isUserRegistered(email: string): Promise<boolean> {
  const user = await getPrismaClient().user.findUnique({
    where: {
      email: email,
    },
  });

  return !!user;
}

export async function updateUser(
  id: number,
  updateUserRequest: Partial<Omit<UserRecord, "id">>,
): Promise<UserRecord> {
  const resultUser = await getPrismaClient().user.update({
    where: { id },
    data: { ...updateUserRequest },
  });
  return resultUser;
}

export async function deleteUser(userIdToDelete: number): Promise<UserRecord> {
  const deleteResult = await getPrismaClient().user.delete({
    where: {
      id: userIdToDelete,
    },
  });
  return deleteResult;
}

export async function cleanupData(): Promise<any> {
  const deleteResult = await getPrismaClient().user.deleteMany();
  return deleteResult;
}
