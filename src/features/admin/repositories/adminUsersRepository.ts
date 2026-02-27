import { AdminUser } from "@/features/admin/types/adminUser.types";

export const fetchAllUsers = async (): Promise<AdminUser[]> => {
    // NOTE: Fetching users from the dummy JSON API

  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  return data.users || [];// NOTE: Return empty array if users property doesn't exist
};
