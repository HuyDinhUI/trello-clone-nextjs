"use client";

import { BoardFacade } from "@/facades/board.facade";
import { CardFacade } from "@/facades/card.facade";
import { store } from "@/store";
import { moveCard } from "@/store/board/board.slice";
import { Column } from "@/types/board.type";
import { findColumnByCardId, getNewCardIndex } from "@/utils/helper";
import {
  defaultDropAnimationSideEffects,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { EntityId } from "@reduxjs/toolkit";
import { useState } from "react";

export const TYPE_ACTIVE_DND = {
  COLUMN: "T_COLUMN",
  CARD: "T_CARD",
};

const useDragDrop = (
  columns: Column[],
  currentBoardId: EntityId,
) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(pointerSensor);
  const [activeDragItemId, setActiveDragItemId] = useState<EntityId | null>(
    null,
  );
  const [activeDragItemType, setActiveDragItemType] = useState<EntityId | null>(
    null,
  );
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);

  const HandleDragStart = (event: DragStartEvent) => {
    setActiveDragItemId(event?.active?.id as EntityId);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? TYPE_ACTIVE_DND.CARD
        : TYPE_ACTIVE_DND.COLUMN,
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const HandleDragOver = (event: DragOverEvent) => {
    if (activeDragItemType === TYPE_ACTIVE_DND.COLUMN) return;

    const { active, over } = event;

    if (!over) return;

    const activeCardId = active.id as string;
    const overCardId = over.id as string;

    const activeColumn = findColumnByCardId(activeCardId, columns);
    const overColumn = findColumnByCardId(overCardId, columns);

    if (!activeColumn || !overColumn) return;

    const overCardIndex = overColumn?.cards?.findIndex(
      (card) => card._id === overCardId,
    );

    const newIndex = getNewCardIndex({
      active,
      over,
      overCardIndex,
    });

    store.dispatch(
      moveCard({
        CardId: activeCardId,
        fromColumnId: activeColumn._id,
        toColumnId: overColumn._id,
        newIndex,
      }),
    );
  };

  const HandleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (activeDragItemType === TYPE_ACTIVE_DND.CARD) {
      CardFacade.updateOrderAndPosition(currentBoardId!, columns);
    }

    if (activeDragItemType === TYPE_ACTIVE_DND.COLUMN && columns) {
      const oldIndex = columns?.findIndex((c) => c._id === active.id);
      const newIndex = columns?.findIndex((c) => c._id === over.id);

      const NewColumnData = arrayMove(columns, oldIndex, newIndex);
      BoardFacade.reorderColumn(currentBoardId!, NewColumnData);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } },
    }),
  };

  return {
    sensors,
    activeDragItemId,
    activeDragItemData,
    activeDragItemType,
    HandleDragStart,
    HandleDragOver,
    HandleDragEnd,
    dropAnimation

  };
};

export default useDragDrop;
