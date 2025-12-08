import { Board } from "./board.type";

export interface User {
  _id: string;
  username: string;
  email: string;
  recentBoards: RecentBoards[];
}

interface RecentBoards {
  board: Board;
  visitedAt: string
}
