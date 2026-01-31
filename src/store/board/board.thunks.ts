import { BoardService } from "@/services/board-service";
import { createAsyncThunk, EntityId } from "@reduxjs/toolkit";
import {
  addCard,
  addChecklist,
  addChecklistItem,
  addColumn,
  deleteCard,
  deleteColumn,
  editLabelChecklistItem,
  editTitleChecklist,
  removeChecklist,
  removeChecklistItem,
  setColumn,
  toggleLabel,
  updateBoard,
  updateCard,
  updateColumn,
  updateDate,
  updateDescription,
  updateStatusChecklistItem,
} from "./board.slice";
import { ColumnService } from "@/services/column-service";
import { CardService } from "@/services/card-service";
import { Column, Tag } from "@/types/board.type";
import { CardDate } from "@/types/card-date.type";
import { CheckList, CheckListItem } from "@/types/card-checklist";
import { EditorData } from "@/types/description.type";

//=======================================================//
//================== BOARD THUNK =======================//
//=====================================================//

export const fetchAllBoard = createAsyncThunk("board/fetchAll", async () => {
  const res = await BoardService.getBoards();
  return res.data;
});

export const fetchBoard = createAsyncThunk(
  "board/fetch",
  async (id: EntityId) => {
    const res = await BoardService.getBoard(id);
    return res.data;
  },
);

export const changeCover = createAsyncThunk(
  "board/changeCover",
  async (payload: { id: EntityId; cover: string }, { dispatch }) => {
    dispatch(
      updateBoard({ id: payload.id, changes: { cover: payload.cover } }),
    );

    const res = await BoardService.updateCover(payload.id, payload.cover);

    return res.data;
  },
);

export const reorderColumnAsync = createAsyncThunk(
  "board/reorderColumn",
  async (payload: { boardId: EntityId; columns: Column[] }, { dispatch }) => {
    dispatch(setColumn(payload.columns));

    const res = await BoardService.reorderColumn(payload.boardId, {
      columnsOrder: payload.columns.map((c) => c._id),
    });

    return res.data;
  },
);

export const starredAsync = createAsyncThunk(
  "board/starredAsync",
  async (payload: { boardId: EntityId; starred: boolean }, { dispatch }) => {
    dispatch(
      updateBoard({
        id: payload.boardId,
        changes: { starred: payload.starred },
      }),
    );

    const res = await BoardService.starred(payload.boardId, payload.starred);

    return res.data;
  },
);

export const editLabelBoardAsync = createAsyncThunk(
  "board/editLabelBoard",
  async (payload: { boardId: EntityId; title: string }, { dispatch }) => {
    dispatch(
      updateBoard({
        id: payload.boardId,
        changes: { title: payload.title },
      }),
    );

    const res = await BoardService.editLabel(payload.boardId, payload.title);

    return res.data;
  },
);

//=======================================================//
//================== COLUMN THUNK ======================//
//=====================================================//

export const addColumnAsync = createAsyncThunk(
  "board/addColumn",
  async (
    payload: { tempId: EntityId; title: string; boardId: EntityId },
    { dispatch },
  ) => {
    dispatch(addColumn(payload.tempId, payload.title, payload.boardId));

    const res = await ColumnService.createColumn(payload);

    return { realId: res.data._id, tempId: payload.tempId };
  },
);

export const editLabelColumnAsync = createAsyncThunk(
  "board/editLabelColumn",
  async (payload: { id: EntityId; title: string }, { dispatch }) => {
    dispatch(
      updateColumn({ id: payload.id, changes: { title: payload.title } }),
    );

    const res = await ColumnService.updateColumn(payload);

    return res.data;
  },
);

export const deleteColumnAsync = createAsyncThunk(
  "board/deleteColumn",
  async (id: EntityId, { dispatch }) => {
    dispatch(deleteColumn(id));

    const res = await ColumnService.deleteColumn(id);

    return res.data;
  },
);

//=======================================================//
//================== CARD THUNK ========================//
//=====================================================//

export const fetchCard = createAsyncThunk(
  "board/fetchCard",
  async (id: EntityId) => {
    const res = await CardService.getCard(id);
    return res.data;
  },
);

export const addCardAsync = createAsyncThunk(
  "board/addCard",
  async (
    payload: { tempId: EntityId; label: string; columnId: EntityId },
    { dispatch },
  ) => {
    dispatch(addCard(payload.tempId, payload.label, payload.columnId));

    const res = await CardService.createCard(payload);
    return {
      realId: res.data._id,
      tempId: payload.tempId,
      columnId: payload.columnId,
    };
  },
);

export const markedCardAsync = createAsyncThunk(
  "board/markCard",
  async (
    payload: { id: EntityId; marked: boolean; columnId: EntityId },
    { dispatch },
  ) => {
    dispatch(
      updateCard({ id: payload.id, changes: { status: payload.marked } }),
    );

    const res = await CardService.updateContent({
      _id: payload.id,
      columnId: payload.columnId,
      status: payload.marked,
    });

    return res.data;
  },
);

export const deleteCardAsync = createAsyncThunk(
  "board/deleteCard",
  async (payload: { CardId: EntityId; columnId: EntityId }, { dispatch }) => {
    dispatch(
      deleteCard({ CardId: payload.CardId, columnId: payload.columnId }),
    );

    const res = await CardService.deleteCard(payload.CardId);

    return res.data;
  },
);

export const updateOrderAndPositionAsync = createAsyncThunk(
  "board/updateOrderAndPosition",
  async (payload: { boardId: EntityId; columns: Column[] }) => {
    const res = await CardService.updateOrderAndPosition({
      boardId: payload.boardId,
      columns: payload.columns,
    });

    return res.data;
  },
);

export const changeCoverCardAsync = createAsyncThunk(
  "board/changeCoverCard",
  async (
    payload: { CardId: EntityId; cover: string; columnId: EntityId },
    { dispatch },
  ) => {
    dispatch(
      updateCard({ id: payload.CardId, changes: { cover: payload.cover } }),
    );

    const res = await CardService.updateContent({
      _id: payload.CardId,
      columnId: payload.columnId,
      cover: payload.cover,
    });

    return res.data;
  },
);

export const toggleLabelAsync = createAsyncThunk(
  "board/toggleLabel",
  async (payload: { CardId: EntityId; label: Tag }, { dispatch }) => {
    dispatch(toggleLabel({ CardId: payload.CardId, label: payload.label }));
  },
);

export const updateDateAsync = createAsyncThunk(
  "board/updateDate",
  async (payload: { CardId: EntityId; date: CardDate }, { dispatch }) => {
    dispatch(updateDate({ CardId: payload.CardId, date: payload.date }));
  },
);

export const addChecklistAsync = createAsyncThunk(
  "board/addChecklistToCard",
  async (payload: { CardId: EntityId; data: CheckList }, { dispatch }) => {
    dispatch(addChecklist({ CardId: payload.CardId, checklist: payload.data }));
  },
);

export const editTitleChecklistAsync = createAsyncThunk(
  "board/editTitleChecklist",
  async (
    payload: { CardId: EntityId; ChecklistId: EntityId; title: string },
    { dispatch },
  ) => {
    dispatch(
      editTitleChecklist({
        CardId: payload.CardId,
        ChecklistId: payload.ChecklistId,
        title: payload.title,
      }),
    );
  },
);

export const removeChecklistAsync = createAsyncThunk(
  "board/removeChecklist",
  async (
    payload: { CardId: EntityId; ChecklistId: EntityId },
    { dispatch },
  ) => {
    dispatch(
      removeChecklist({
        CardId: payload.CardId,
        ChecklistId: payload.ChecklistId,
      }),
    );
  },
);

export const addChecklistItemAsync = createAsyncThunk(
  "board/addChecklistItem",
  async (
    payload: {
      CardId: EntityId;
      ChecklistId: EntityId;
      ChecklistItem: CheckListItem;
    },
    { dispatch },
  ) => {
    dispatch(
      addChecklistItem({
        CardId: payload.CardId,
        ChecklistId: payload.ChecklistId,
        ChecklistItem: payload.ChecklistItem,
      }),
    );
  },
);

export const updateStatusChecklistItemAsync = createAsyncThunk(
  "board/updateStatusChecklistItem",
  async (
    payload: {
      CardId: EntityId;
      ChecklistId: EntityId;
      ChecklistItemId: EntityId;
      status: boolean;
    },
    { dispatch },
  ) => {
    dispatch(
      updateStatusChecklistItem({
        CardId: payload.CardId,
        ChecklistId: payload.ChecklistId,
        ChecklistItemId: payload.ChecklistItemId,
        status: payload.status,
      }),
    );
  },
);

export const editLabelChecklistItemAsync = createAsyncThunk(
  "board/editLabelChecklistItem",
  async (
    payload: {
      CardId: EntityId;
      ChecklistId: EntityId;
      ChecklistItemId: EntityId;
      label: string;
    },
    { dispatch },
  ) => {
    dispatch(
      editLabelChecklistItem({
        CardId: payload.CardId,
        ChecklistId: payload.ChecklistId,
        ChecklistItemId: payload.ChecklistItemId,
        label: payload.label,
      }),
    );
  },
);

export const removeChecklistItemAsync = createAsyncThunk(
  "board/removeChecklistItem",
  async (
    payload: {
      CardId: EntityId;
      ChecklistId: EntityId;
      ChecklistItemId: EntityId;
    },
    { dispatch },
  ) => {
    dispatch(
      removeChecklistItem({
        CardId: payload.CardId,
        ChecklistId: payload.ChecklistId,
        ChecklistItemId: payload.ChecklistItemId,
      }),
    );
  },
);

export const updateDescriptionAsync = createAsyncThunk(
  "board/updateDescription",
  async (
    payload: { CardId: EntityId; description: EditorData },
    { dispatch },
  ) => {
    dispatch(
      updateDescription({
        CardId: payload.CardId,
        description: payload.description,
      }),
    );
  },
);
