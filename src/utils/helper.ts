import { Column } from "@/types/board.type";
import { EntityId } from "@reduxjs/toolkit";

export const findColumnByCardId = (cardId: EntityId, columns: Column[]) => {
  return columns?.find((column) =>
    column.cards.map((card) => card._id)?.includes(cardId)
  );
};

export const getNewCardIndex = ({ active, over, overCardIndex }: any) => {
  if (!active.rect.current.translated) return overCardIndex;

  const isBelow =
    active.rect.current.translated.top > over.rect.top + over.rect.height / 2;

  return isBelow ? overCardIndex + 1 : overCardIndex;
};
