import { store } from "@/store";
import {
  addColumnAsync,
  deleteColumnAsync,
  editLabelColumnAsync,
} from "@/store/board/board.thunks";
import { EntityId } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const ColumnFacade = {
  add(title: string, boardId: EntityId) {
    const tempId = uuid();
    store.dispatch(addColumnAsync({ tempId, title, boardId }));
  },

  update(id: EntityId, title: string) {
    store.dispatch(editLabelColumnAsync({ id, title }));
  },

  delete(id: EntityId) {
    store.dispatch(deleteColumnAsync(id));
  },
};
