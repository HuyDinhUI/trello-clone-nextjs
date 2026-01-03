import { UserService } from "@/services/user-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/get", async () => {
  const res = await UserService.getUser();
  return res.data.user;
});