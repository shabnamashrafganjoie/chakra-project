import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminUser , UserState } from "@/features/admin/types/adminUser.types";
import { getUsers } from "@/features/admin/services/adminUsersService";

const initialState: UserState = {
  loading: false,
  users: [],
  error: null,
};
// NOTE: Creating a thunk to fetch the list of users from the server
export const fetchUsers = createAsyncThunk<AdminUser[]>(
  "users/fetchUsers",
  async () => {
    return await getUsers();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // NOTE: Loading state - when sending request to the server
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // NOTE: Success state - when data is successfully received from the server
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // NOTE: Error state - when there's a problem connecting to the server or receiving data

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});
export default usersSlice.reducer;
