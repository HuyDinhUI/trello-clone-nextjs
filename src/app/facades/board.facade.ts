import { changeCover, fetchBoard, reorderColumnAsync } from '@/store/board/board.thunks'
import {store} from '@/store/index'
import { Column } from '@/types/board.type'
import { EntityId } from '@reduxjs/toolkit'

export const BoardFacade = {

    load (id: EntityId) {
        store.dispatch(fetchBoard(id))
    },

    changeCover (id: EntityId, cover: string) {
        store.dispatch(changeCover({id, cover}))
    },

    reorderColumn (boardId: EntityId, columns: Column[]) {
        store.dispatch(reorderColumnAsync({boardId, columns}))
    }
}