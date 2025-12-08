import { UserService } from "@/services/user.service";
import { User } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/get", async () => {
  const res = await UserService.getUser();
  return res.data.user;
});

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

    updateRecentBoard(state, action) {
      state.user = {
        ...state.user,
        recentBoards: state.user.recentBoards.filter(
          (b) => b.board._id !== action.payload.board._id
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
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser, updateRecentBoard } = userSlice.actions;

export default userSlice.reducer;
