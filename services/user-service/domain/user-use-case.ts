import * as userRepository from "../data-access/user-repository";

import { AddUserSchema, UpdateUserSchema, userIdSchema } from "./user-schema"; // Import your schemas here
import {
  assertUserExistsById,
  assertUserExistsByMail,
  assertUserNotExistsByMail,
} from "./user-validator";

export async function getAllUser() {
  const response = await userRepository.getAllUsers();
  return response;
}

// Define a Zod validator for user ID
// ✅ Validate and add a new user

export async function addUser(newUser: any) {
  // Validate newUser against the AddUserSchema
  await assertUserNotExistsByMail(newUser.email);
  const validatedData = AddUserSchema.parse(newUser);
  const response = await userRepository.addUser(validatedData);
  return response;
}

// ✅ Delete a user by ID
export async function deleteUser(userId: number) {
  // Validate userId using the userIdValidator
  userIdSchema.parse(userId);
  await assertUserExistsById(userId);
  return userRepository.deleteUser(userId);
}

// ✅ Get a user by mail
export async function getUserById(userId: number) {
  // Validate userId using the userIdValidator
  userIdSchema.parse(userId);
  await assertUserExistsById(userId);
  return userRepository.getUserById(userId);
}

export async function getUserByMail(mail: string) {
  // Validate userId using the userIdValidator
  await assertUserExistsByMail(mail);
  return userRepository.getUserByEmail(mail);
}

// ✅ Update a user by ID
export async function updateUser(userId: number, updateUserRequest: any) {
  userIdSchema.parse(userId);
  await assertUserExistsById(userId);
  const validatedData = UpdateUserSchema.parse(updateUserRequest);
  return userRepository.updateUser(userId, validatedData);
}
