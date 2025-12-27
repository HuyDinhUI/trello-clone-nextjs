import API from "@/utils/axios";

interface IUser {
  getUser(): Promise<any>;
  updateRecentBoardAsync(boardId: string): Promise<any>;
}

class User implements IUser {
  getUser(): Promise<any> {
    return API.get("/user/get/me");
  }

  updateRecentBoardAsync(boardId: string): Promise<any> {
    return API.put(`/user/update/recentBoard/${boardId}`);
  }
}

export const UserService = new User()
