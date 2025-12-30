import { Board, Card, Column } from "@/types/board.type";
import { createEntityAdapter, EntityId } from "@reduxjs/toolkit";

export const boardsAdapter = createEntityAdapter<Board, EntityId>({
    selectId: (b) => b._id,
    sortComparer: false
})

export const columnAdapter = createEntityAdapter<Column, EntityId>({
    selectId: (c) => c._id,
    sortComparer: false
})

export const cardAdapter = createEntityAdapter<Card, EntityId>({
    selectId: (c) => c._id,
    sortComparer: false
})

