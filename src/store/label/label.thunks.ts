import { DATA_MOCK_TAGS_INIT } from "@/mock/Label-mock";
import { createAsyncThunk, EntityId } from "@reduxjs/toolkit";
import { add, remove, update } from "./label.slice";
import { Tag } from "@/types/board.type";

export const fetchAllLabels = createAsyncThunk("label/fetchAll", async () => {
  return DATA_MOCK_TAGS_INIT;
});

export const addLabelAsync = createAsyncThunk(
  "label/add",
  async (
    payload: {
      tempId: EntityId;
      title: string;
      color: { name: string; code: string };
    },
    { dispatch },
  ) => {
    dispatch(add(payload.tempId, payload.title, payload.color));
  },
);

export const updateLabelAsync = createAsyncThunk(
  "label/update",
  async (
    payload: {
      id: EntityId;
      label: Tag;
    },
    { dispatch },
  ) => {
    console.log(payload)
    dispatch(
      update({
        id: payload.id,
        changes: { title: payload.label.title, color: payload.label.color },
      }),
    );
  },
);

export const removeLabelAsync = createAsyncThunk(
  "label/remove",
  async (id: EntityId, { dispatch }) => {
    dispatch(remove(id));
  },
);
