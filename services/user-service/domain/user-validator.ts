import * as userRepository from "../data-access/user-repository";

export async function assertUserExistsById(id: number) {
  const user = await userRepository.getUserById(id);
  console.log(id);
  if (!user) {
    throw new Error("User not found");
  }
}
export async function assertUserExistsByMail(mail: string) {
  const user = await userRepository.getUserByEmail(mail);
  if (!user) {
    throw new Error("User with email does not exist");
  }
}

export async function assertUserNotExistsByMail(mail: string) {
  const user = await userRepository.getUserByEmail(mail);
  if (user) {
    throw new Error("User already exist");
  }
}
