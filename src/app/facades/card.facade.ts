import { store } from "@/store";
import { addCardAsync, deleteCardAsync, markedCardAsync, updateOrderAndPositionAsync } from "@/store/board/board.thunks";
import { Column } from "@/types/board.type";
import { EntityId } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const CardFacade = {
    add (label: string, columnId: EntityId) {
        const tempId = uuid()
        store.dispatch(addCardAsync({tempId, label, columnId}))
    },

    update (id: EntityId, marked: boolean, columnId: EntityId) {
        store.dispatch(markedCardAsync({id, marked, columnId}))
    },

    delete (CardId: EntityId, columnId: EntityId) {
        store.dispatch(deleteCardAsync({CardId, columnId}))
    },

    updateOrderAndPosition (boardId: EntityId, columns: Column[]) {
        store.dispatch(updateOrderAndPositionAsync({boardId, columns}))
    }
}