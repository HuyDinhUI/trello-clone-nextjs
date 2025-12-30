import { EntityId } from "@reduxjs/toolkit";
import { User } from "./user.type";

interface MongoEntity {
  _id: EntityId
}

export interface Board extends MongoEntity {
  title: string;
  cover: string;
  visibility: string;
  ownerIds: User[];
  memberIds: User[];
  columns: string[];
  columnsOrder: Column[];
  starred: boolean
  closed: boolean
  dateLastView: string
}

export interface Column extends MongoEntity {
  title: string;
  boardId: EntityId;
  cards: Card[];
  isTemp?: boolean
}

type checklist = {
  label: string;
  checked: boolean;
};

export interface Card extends MongoEntity {
  label: string;
  status: boolean;
  columnId: EntityId;
  cover: string;
  description: string;
  attachments: string[];
  checklist: checklist[];
  joined: User[];
  FE_placeholderCard?: boolean;
  isTemp?: boolean
}



