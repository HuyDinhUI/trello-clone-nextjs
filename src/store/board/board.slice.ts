import { createSlice, EntityId, PayloadAction, Update } from "@reduxjs/toolkit";
import { boardsAdapter, cardAdapter, columnAdapter } from "./board.adapter";
import { Board, Card, Column, Tag } from "@/types/board.type";
import {
  addCardAsync,
  addColumnAsync,
  fetchAllBoard,
  fetchBoard,
} from "./board.thunks";
import { isEmpty } from "lodash";
import { generatePlaceholdeCard } from "@/utils/formatters";
import { CardDate } from "@/types/card-date.type";
import { CheckList } from "@/types/card-checklist";

const initialState = {
  boards: boardsAdapter.getInitialState(),
  columns: columnAdapter.getInitialState(),
  cards: cardAdapter.getInitialState(),

  currenBoardId: null as EntityId | null,
  loading: false,
  error: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    //=================================================//
    //================== BOARD ========================//
    //=================================================//

    setBoards(state, action: PayloadAction<Board[]>) {
      boardsAdapter.setAll(state.boards, action.payload);
    },

    updateBoard(
      state,
      action: PayloadAction<{ id: EntityId; changes: Partial<Board> }>,
    ) {
      boardsAdapter.updateOne(state.boards, action.payload);
    },

    closeBoard(state, action: PayloadAction<string>) {
      boardsAdapter.updateOne(state.boards, {
        id: action.payload,
        changes: { closed: true },
      });
    },

    //================================================//
    //================== COLUMN ======================//
    //================================================//

    setColumn(state, action: PayloadAction<Column[]>) {
      columnAdapter.setAll(state.columns, action.payload);
    },

    addColumn: {
      reducer(state, action: PayloadAction<Column>) {
        columnAdapter.addOne(state.columns, action.payload);

        const cardTemp = generatePlaceholdeCard(action.payload);

        columnAdapter.updateOne(state.columns, {
          id: action.payload._id,
          changes: { cards: [cardTemp] },
        });

        cardAdapter.addOne(state.cards, cardTemp);

        boardsAdapter.updateOne(state.boards, {
          id: action.payload.boardId,
          changes: {
            columnsOrder: [
              ...(state.boards.entities[action.payload.boardId]?.columnsOrder ??
                []),
              action.payload._id,
            ],
          },
        } as Update<Board, EntityId>);
      },
      prepare(tempId: EntityId, title: string, boardId: EntityId) {
        return {
          payload: {
            _id: tempId,
            title,
            boardId,
            cards: [],
            isTemp: true,
          } as Column,
        };
      },
    },

    updateColumn(
      state,
      action: PayloadAction<{ id: EntityId; changes: Partial<Column> }>,
    ) {
      columnAdapter.updateOne(state.columns, action.payload);
    },

    deleteColumn(state, action: PayloadAction<EntityId>) {
      columnAdapter.removeOne(state.columns, action.payload);
    },

    //=================================================//
    //================== CARD =========================//
    //=================================================//

    addCard: {
      reducer(state, action: PayloadAction<Card>) {
        cardAdapter.addOne(state.cards, action.payload);

        columnAdapter.updateOne(state.columns, {
          id: action.payload.columnId,
          changes: {
            cards: [
              ...(state.columns.entities[action.payload.columnId]?.cards ?? []),
              action.payload,
            ],
          },
        } as Update<Column, EntityId>);
      },

      prepare(tempId: EntityId, label: string, columnId: EntityId) {
        return {
          payload: {
            _id: tempId,
            label,
            status: false,
            columnId,
            cover: "",
            description: "",
            attachments: [],
            checklist: [],
            date: {
              startDate: null,
              dueDate: null,
              recurring: "Daily",
              reminder: "None",
            },
            joined: [],
            tag: [],
            FE_placeholderCard: false,
            isTemp: true,
          } as Card,
        };
      },
    },

    updateCard(
      state,
      action: PayloadAction<{ id: EntityId; changes: Partial<Card> }>,
    ) {
      cardAdapter.updateOne(state.cards, action.payload);
    },

    deleteCard(
      state,
      action: PayloadAction<{ CardId: EntityId; columnId: EntityId }>,
    ) {
      cardAdapter.removeOne(state.cards, action.payload.CardId);
      columnAdapter.updateOne(state.columns, {
        id: action.payload.columnId,
        changes: {
          cards: state.columns.entities[action.payload.columnId]?.cards.filter(
            (c) => c._id !== action.payload.CardId,
          ),
        },
      } as Update<Column, EntityId>);
    },

    moveCard: (
      state,
      action: PayloadAction<{
        CardId: EntityId;
        fromColumnId: EntityId;
        toColumnId: EntityId;
        newIndex: number;
      }>,
    ) => {
      const { CardId, fromColumnId, toColumnId, newIndex } = action.payload;

      const fromColumn = state.columns.entities[fromColumnId];
      const toColumn = state.columns.entities[toColumnId];

      if (!fromColumn || !toColumn) return;

      fromColumn.cards = fromColumn.cards.filter((c) => c._id !== CardId);
      fromColumn.cards = fromColumn.cards.map((c: Card) =>
        c._id === CardId ? { ...c, columnId: toColumnId } : c,
      );

      if (isEmpty(fromColumn.cards)) {
        const cardTemp = generatePlaceholdeCard(fromColumn);
        fromColumn.cards = [cardTemp];
        cardAdapter.addOne(state.cards, cardTemp);
      }

      cardAdapter.updateOne(state.cards, {
        id: CardId,
        changes: { columnId: toColumnId },
      });

      toColumn.cards = toColumn.cards.filter(
        (card) => !card.FE_placeholderCard,
      );

      toColumn.cards.splice(newIndex, 0, state.cards.entities[CardId]);
    },

    toggleLabel: (
      state,
      action: PayloadAction<{ CardId: EntityId; label: Tag }>,
    ) => {
      const card = state.cards.entities[action.payload.CardId];
      const existed = card.tag.some((t) => t._id === action.payload.label._id);

      if (existed) {
        card.tag = card.tag.filter((t) => t._id !== action.payload.label._id);
      } else {
        card.tag = [...card.tag, action.payload.label];
      }

      cardAdapter.updateOne(state.cards, {
        id: action.payload.CardId,
        changes: card,
      });
    },

    updateDate: (
      state,
      action: PayloadAction<{ CardId: EntityId; date: CardDate }>,
    ) => {
      cardAdapter.updateOne(state.cards, {
        id: action.payload.CardId,
        changes: { date: action.payload.date },
      });
    },

    addChecklist: (
      state,
      action: PayloadAction<{ CardId: EntityId; checklist: CheckList }>,
    ) => {
      const list = state.cards.entities[action.payload.CardId].checklist;
      cardAdapter.updateOne(state.cards, {
        id: action.payload.CardId,
        changes: { checklist: [...list, action.payload.checklist] },
      });
    },

    removeChecklist: (
      state,
      action: PayloadAction<{ CardId: EntityId; ChecklistId: EntityId }>,
    ) => {
      const checklist = state.cards.entities[action.payload.CardId].checklist;
      cardAdapter.updateOne(state.cards, {
        id: action.payload.CardId,
        changes: { checklist: checklist.filter((item) => !item._id) },
      });
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBoard.fulfilled, (state, action) => {
        state.loading = false;
        boardsAdapter.setAll(state.boards, action.payload);
      })
      .addCase(fetchAllBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })

      //===============================================//
      //================== RECENT BOARD CASE =================//
      //===============================================//

      .addCase(fetchBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        const board = action.payload;

        const cards: Card[] = [];

        for (const col of board.columnsOrder) {
          for (const card of col.cards) {
            cards.push({
              _id: card._id,
              label: card.label,
              columnId: col._id,
              status: card.status,
              cover: card.cover,
              description: card.description,
              attachments: card.attachments,
              checklist: card.checklist ?? [],
              date: card.date ?? {
                startDate: null,
                dueDate: null,
                recurring: "Never",
                reminder: "None",
              },
              tag: card.tag ?? [],
              joined: card.joined,
            });
          }
        }

        state.loading = false;
        state.currenBoardId = board._id;

        boardsAdapter.upsertOne(state.boards, board);
        columnAdapter.setAll(state.columns, board.columnsOrder);
        cardAdapter.setAll(state.cards, cards);
      })
      .addCase(fetchBoard.rejected, (state) => {
        state.loading = false;
        state.error = "Load board failed";
      })

      //=====================================================//
      //================== COLUMN CASE ======================//
      //=====================================================//

      .addCase(addColumnAsync.fulfilled, (state, action) => {
        columnAdapter.updateOne(state.columns, {
          id: action.payload.tempId,
          changes: { _id: action.payload.realId, isTemp: false },
        });
      })

      //====================================================//
      //================== CARD CASE =======================//
      //====================================================//

      .addCase(addCardAsync.fulfilled, (state, action) => {
        cardAdapter.updateOne(state.cards, {
          id: action.payload.tempId,
          changes: { _id: action.payload.realId, isTemp: false },
        });

        columnAdapter.updateOne(state.columns, {
          id: action.payload.columnId,
          changes: {
            cards: state.columns.entities[action.payload.columnId]?.cards.map(
              (c) =>
                c._id === action.payload.tempId
                  ? { ...c, _id: action.payload.realId }
                  : c,
            ),
          },
        } as Update<Column, EntityId>);
      });
  },
});

export const {
  setBoards,
  updateBoard,
  closeBoard,
  setColumn,
  addColumn,
  updateColumn,
  deleteColumn,
  addCard,
  updateCard,
  deleteCard,
  moveCard,
  toggleLabel,
  updateDate,
  addChecklist,
  removeChecklist
} = boardSlice.actions;

export default boardSlice.reducer;
