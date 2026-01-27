import { User } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, updateRecentBoardAsync } from "./user.thunks";
import { Board } from "@/types/board.type";

const user: User = {
  _id: "",
  username: "",
  email: "",
  recentBoards: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user,
    loading: false,
    error: "",
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.data;
    },

    updateRecentBoard(state, action: PayloadAction<{ board: Board }>) {
      state.user = {
        ...state.user,
        recentBoards: state.user.recentBoards.filter(
          (b) => b.board._id !== action.payload.board._id,
        ),
      };

      state.user = {
        ...state.user,
        recentBoards: [
          ...state.user.recentBoards,
          { board: action.payload.board, visitedAt: new Date().toISOString() },
        ],
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })

      .addCase(updateRecentBoardAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecentBoardAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRecentBoardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, updateRecentBoard } = userSlice.actions;

export default userSlice.reducer;
