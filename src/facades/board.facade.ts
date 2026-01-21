import { changeCover, editLabelBoardAsync, fetchAllBoard, fetchBoard, reorderColumnAsync, starredAsync } from '@/store/board/board.thunks'
import {store} from '@/store/index'
import { Column } from '@/types/board.type'
import { EntityId } from '@reduxjs/toolkit'

export const BoardFacade = {

    loadAll () {
        store.dispatch(fetchAllBoard())
    },

    load (id: EntityId) {
        store.dispatch(fetchBoard(id))
    },

    changeCover (id: EntityId, cover: string) {
        store.dispatch(changeCover({id, cover}))
    },

    reorderColumn (boardId: EntityId, columns: Column[]) {
        store.dispatch(reorderColumnAsync({boardId, columns}))
    },

    starred (boardId: EntityId, starred: boolean) {
        store.dispatch(starredAsync({boardId, starred}))
    },

    editLabel (boardId: EntityId, title: string) {
        store.dispatch(editLabelBoardAsync({boardId, title}))
    }
}