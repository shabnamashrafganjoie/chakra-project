import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store/store";
import { fetchUsers } from "../redux/getAdminUsersSlice";

export const useUser = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  // NOTE: Getting the complete list of users from the store

  const user = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  // NOTE: Fetching all users every time the component mounts

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return { user, loading, error };
};
