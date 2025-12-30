import { RootState } from "..";
import { boardsAdapter, cardAdapter, columnAdapter } from "./board.adapter";

export const boardsSelectors = boardsAdapter.getSelectors((state: RootState) => state.board.boards)
export const columnsSelectors = columnAdapter.getSelectors((state: RootState) => state.board.columns)
export const cardsSelectors = cardAdapter.getSelectors((state: RootState) => state.board.cards)