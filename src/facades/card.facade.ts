import { store } from "@/store";
import {
  addCardAsync,
  addChecklistAsync,
  changeCoverCardAsync,
  deleteCardAsync,
  markedCardAsync,
  removeChecklistAsync,
  toggleLabelAsync,
  updateDateAsync,
  updateOrderAndPositionAsync,
} from "@/store/board/board.thunks";
import { Column, Tag } from "@/types/board.type";
import { CardDate } from "@/types/card-date.type";
import { EntityId } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const CardFacade = {
  add(label: string, columnId: EntityId) {
    const tempId = uuid();
    store.dispatch(addCardAsync({ tempId, label, columnId }));
  },

  marked(id: EntityId, marked: boolean, columnId: EntityId) {
    store.dispatch(markedCardAsync({ id, marked, columnId }));
  },

  delete(CardId: EntityId, columnId: EntityId) {
    store.dispatch(deleteCardAsync({ CardId, columnId }));
  },

  updateOrderAndPosition(boardId: EntityId, columns: Column[]) {
    store.dispatch(updateOrderAndPositionAsync({ boardId, columns }));
  },

  changeCoverCard(CardId: EntityId, cover: string, columnId: EntityId) {
    store.dispatch(changeCoverCardAsync({ CardId, cover, columnId }));
  },

  toggleLabel(CardId: EntityId, label: Tag) {
    store.dispatch(toggleLabelAsync({ CardId, label }));
  },

  updateDate(CardId: EntityId, date: CardDate) {
    store.dispatch(updateDateAsync({ CardId, date }));
  },

  addChecklist(CardId: EntityId, title: string) {
    store.dispatch(
      addChecklistAsync({
        CardId,
        data: {
          _id: uuid(),
          title,
          items: [],
          process: {
            total: 0,
            process: 0,
          },
        },
      }),
    );
  },

  removeChecklist(CardId: EntityId, ChecklistId: EntityId) {
    store.dispatch(removeChecklistAsync({ CardId, ChecklistId }));
  },
};
