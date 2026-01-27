import { store } from "@/store";
import {
  addLabelAsync,
  fetchAllLabels,
  removeLabelAsync,
  updateLabelAsync,
} from "@/store/label/label.thunks";
import { Tag } from "@/types/board.type";
import { EntityId } from "@reduxjs/toolkit";

export const LabelFacade = {
  loadAll() {
    store.dispatch(fetchAllLabels());
  },

  addLabel(title: string, color: { name: string; code: string }) {
    const tempId = crypto.randomUUID();
    store.dispatch(addLabelAsync({ tempId, title, color }));
  },

  updateLabel(id: EntityId, label: Tag) {
    store.dispatch(updateLabelAsync({ id, label }));
  },

  removeLabel(id: EntityId) {
    store.dispatch(removeLabelAsync(id));
  },
};
