import { createSlice, PayloadAction, EntityId } from "@reduxjs/toolkit";
import { labelsAdapter } from "./label.adapter";
import { Tag } from "@/types/board.type";
import { fetchAllLabels } from "./label.thunks";
import { toast } from "react-toastify";

const initialState = {
  labels: labelsAdapter.getInitialState(),
  loading: false,
  error: "",
};

const labelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    set(state, action: PayloadAction<Tag[]>) {
      labelsAdapter.setAll(state.labels, action.payload);
    },

    add: {
      reducer(state, action: PayloadAction<Tag>) {
        labelsAdapter.addOne(state.labels, action.payload);
      },
      prepare(
        tempId: EntityId,
        title: string,
        color: { name: string; code: string },
      ) {
        return {
          payload: {
            _id: tempId,
            title,
            color,
          } as Tag,
        };
      },
    },

    update(
      state,
      action: PayloadAction<{ id: EntityId; changes: Partial<Tag> }>,
    ) {
      console.log(action.payload)
      labelsAdapter.updateOne(state.labels, action.payload);
    },

    remove(state, action: PayloadAction<EntityId>) {
      labelsAdapter.removeOne(state.labels, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLabels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllLabels.fulfilled, (state, action) => {
        state.loading = false;
        labelsAdapter.setAll(state.labels, action.payload);
      })
      .addCase(fetchAllLabels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      });
  },
});

export const { set, add, update, remove } = labelSlice.actions;

export default labelSlice.reducer;
