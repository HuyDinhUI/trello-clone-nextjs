"use client";

import { UserFacade } from "@/app/facades/user.facade";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UserBootstrap = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (accessToken && !user._id) {
      UserFacade.getUser();
    }
  }, [accessToken, user]);

  return null;
};

export default UserBootstrap;
