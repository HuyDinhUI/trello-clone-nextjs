import { store } from "@/store";
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

export function getPersistedAuth() {
  try {
    const token = store.getState().auth.accessToken
    if (!token) return null;
    return token
  } catch {
    return null;
  }
}

export const percentCalculator = (partValue: number, totalValue: number) => {
  return (partValue / totalValue) * 100;
}


