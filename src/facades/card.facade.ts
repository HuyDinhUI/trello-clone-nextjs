import { store } from "@/store";
import {
  addCardAsync,
  addChecklistAsync,
  addChecklistItemAsync,
  changeCoverCardAsync,
  deleteCardAsync,
  editLabelChecklistItemAsync,
  editTitleChecklistAsync,
  fetchCard,
  markedCardAsync,
  removeChecklistAsync,
  removeChecklistItemAsync,
  toggleLabelAsync,
  updateDateAsync,
  updateDescriptionAsync,
  updateOrderAndPositionAsync,
  updateStatusChecklistItemAsync,
} from "@/store/board/board.thunks";
import { Column, Tag } from "@/types/board.type";
import { CardDate } from "@/types/card-date.type";
import { EditorData } from "@/types/description.type";
import { EntityId } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const CardFacade = {
  load(id: EntityId) {
    store.dispatch(fetchCard(id));
  },

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

  editTitleChecklist(CardId: EntityId, ChecklistId: EntityId, title: string) {
    store.dispatch(
      editTitleChecklistAsync({
        CardId,
        ChecklistId,
        title,
      }),
    );
  },

  removeChecklist(CardId: EntityId, ChecklistId: EntityId) {
    store.dispatch(removeChecklistAsync({ CardId, ChecklistId }));
  },

  addChecklistItem(CardId: EntityId, ChecklistId: EntityId, label: string) {
    store.dispatch(
      addChecklistItemAsync({
        CardId,
        ChecklistId,
        ChecklistItem: {
          _id: uuid(),
          label,
          dueDate: "",
          status: false,
          member: [],
        },
      }),
    );
  },

  editLabelCheckListItem(
    CardId: EntityId,
    ChecklistId: EntityId,
    ChecklistItemId: EntityId,
    label: string,
  ) {
    store.dispatch(
      editLabelChecklistItemAsync({
        CardId,
        ChecklistId,
        ChecklistItemId,
        label,
      }),
    );
  },

  updateStatusChecklistItem(
    CardId: EntityId,
    ChecklistId: EntityId,
    ChecklistItemId: EntityId,
    status: boolean,
  ) {
    store.dispatch(
      updateStatusChecklistItemAsync({
        CardId,
        ChecklistId,
        ChecklistItemId,
        status,
      }),
    );
  },

  removeChecklistItem(
    CardId: EntityId,
    ChecklistId: EntityId,
    ChecklistItemId: EntityId,
  ) {
    store.dispatch(
      removeChecklistItemAsync({ CardId, ChecklistId, ChecklistItemId }),
    );
  },

  updateDescription(CardId: EntityId, description: EditorData) {
    store.dispatch(updateDescriptionAsync({ CardId, description }));
  },
};
