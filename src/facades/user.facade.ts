import { store } from "@/store";
import { fetchUser, updateRecentBoardAsync } from "@/store/user/user.thunks";
import { Board } from "@/types/board.type";

export const UserFacade = {
  getUser() {
    store.dispatch(fetchUser());
  },

  updateRecentBoard(board: Board) {
    store.dispatch(updateRecentBoardAsync(board));
  },
};
