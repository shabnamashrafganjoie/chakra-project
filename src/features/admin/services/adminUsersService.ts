import { AdminUser } from "@/features/admin/types/adminUser.types";
import {fetchAllUsers} from "@/features/admin/repositories/adminUsersRepository";

export const getUsers = async (): Promise<AdminUser[]> => {
    // NOTE: Service layer function that calls the users repository
  // This acts as an intermediary between Redux slice and repository
  return await fetchAllUsers();
};
