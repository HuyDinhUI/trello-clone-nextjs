import API from "@/utils/axios";
import { EntityId } from "@reduxjs/toolkit";

interface IUser {
  getUser(): Promise<any>;
  updateRecentBoardAsync(boardId: EntityId): Promise<any>;
}

class User implements IUser {
  getUser(): Promise<any> {
    return API.get("/user/get/me");
  }

  updateRecentBoardAsync(boardId: EntityId): Promise<any> {
    return API.put(`/user/update/recentBoard/${boardId}`);
  }
}

export const UserService = new User()
