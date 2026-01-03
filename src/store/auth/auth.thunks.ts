"use client";

import { AuthSevices } from "@/services/auth-service";
import { LoginBody, RegisterBody } from "@/types/auth.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { persistor } from "..";

export const login = createAsyncThunk("auth/login", async (data: LoginBody) => {
  const res = await AuthSevices.login(data);
  await AuthSevices.setCookie(res.data);

  if (res.data.role === "customer") {
    window.location.href = "/dashboard/boards";
  }

  return res.data;
});

export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterBody) => {
    await AuthSevices.register(data);
    window.location.href = "/auth/login";
    toast.success("Register is success", {
      theme: "light",
    });
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthSevices.logout();
  await persistor.purge();
  window.location.href = "/auth/login";
});

export const oauth = createAsyncThunk(
  "auth/google",
  async (payload: { accessToken: string; refreshToken: string }) => {
    await AuthSevices.setCookie({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    });
    window.location.href = "/dashboard/boards";
    return {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async () => {
    const res = await AuthSevices.refreshToken()
    await AuthSevices.setCookie({
      accessToken: res.data.data.accessToken,
      refreshToken: ''
    })
    return res.data.data
  }
);
