import { UserService } from "@/services/user-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateRecentBoard } from "./user.slice";
import { Board } from "@/types/board.type";

export const fetchUser = createAsyncThunk("user/get", async () => {
  const res = await UserService.getUser();
  return res.data.user;
});

export const updateRecentBoardAsync = createAsyncThunk(
  "user/recentBoard",
  async (board: Board, { dispatch }) => {
    dispatch(updateRecentBoard({ board }));
    const res = await UserService.updateRecentBoardAsync(board._id);
    return res.data;
  },
);
