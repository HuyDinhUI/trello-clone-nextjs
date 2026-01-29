import { EntityId } from "@reduxjs/toolkit";
import { User } from "./user.type";
import { CardDate } from "./card-date.type";
import { CheckList } from "./card-checklist";

export interface MongoEntity {
  _id: EntityId;
}

export interface Board extends MongoEntity {
  title: string;
  cover: string;
  visibility: string;
  ownerIds: User[];
  memberIds: User[];
  columns: string[];
  columnsOrder: Column[];
  starred: boolean;
  closed: boolean;
  dateLastView: string;
}

export interface Column extends MongoEntity {
  title: string;
  boardId: EntityId;
  cards: Card[];
  isTemp?: boolean;
}

export interface Tag extends MongoEntity {
  title: string | null;
  color: {
    name: string;
    code: string;
  };
}

export interface Card extends MongoEntity {
  label: string;
  status: boolean;
  columnId: EntityId;
  cover: string;
  description: string;
  attachments: string[];
  checklist: CheckList[];
  date: CardDate
  tag: Tag[];
  joined: User[];
  FE_placeholderCard?: boolean;
  isTemp?: boolean;
}
