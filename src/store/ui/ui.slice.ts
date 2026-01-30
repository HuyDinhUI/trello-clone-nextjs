"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isCardDetailView: {
    open: false,
    cardId: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsCardDetailView(
      state,
      action: PayloadAction<{ open: boolean; cardId: string }>,
    ) {
      state.isCardDetailView = action.payload;
    },
  },
});

export const { setIsCardDetailView } = uiSlice.actions;

export default uiSlice.reducer;
