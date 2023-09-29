import * as userRepository from '../data-access/user-repository';
import { AddUserSchema, UpdateUserSchema, userIdSchema } from './user-schema'; // Import your schemas here
import { z } from 'zod';
import { assertUserExistsById, assertUserNotExistsByMail } from './user-validator';

export async function getAllUser() {
  const response = await userRepository.getAllUsers();
  return response;
}

// Define a Zod validator for user ID
// ✅ Validate and add a new user

// TODO add type
export async function addUser(newUser: any) {
  // Validate newUser against the AddUserSchema
  await assertUserNotExistsByMail(newUser.email)
  const validatedData = AddUserSchema.parse(newUser);
  const response = await userRepository.addUser(validatedData);
  return response;
}

// ✅ Delete a user by ID
export async function deleteUser(userId: number) {
  // Validate userId using the userIdValidator
  userIdSchema.parse(userId);
  await assertUserExistsById(userId)
  return await userRepository.deleteUser(userId);
}

// ✅ Get a user by mail
export async function getUserById(userId: number) {
  // Validate userId using the userIdValidator
  userIdSchema.parse(userId);
  await assertUserExistsById(userId)
  return await userRepository.getUserById(userId);
}

export async function getUserByMail(mail: string) {
  // Validate userId using the userIdValidator
  await assertUserNotExistsByMail(mail)
  return await userRepository.getUserByEmail(mail);
}


// ✅ Update a user by ID
export async function updateUser(userId: number, updateUserRequest: any) {
  // Validate userId using the userIdValidator
  userIdSchema.parse(userId);
  await assertUserExistsById(userId);
  // Validate updateUserRequest against the UpdateUserSchema
  const validatedData = UpdateUserSchema.parse(updateUserRequest);
  return await userRepository.updateUser(userId, validatedData);
}
