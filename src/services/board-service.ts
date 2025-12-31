import API from "@/utils/axios";
import { EntityId } from "@reduxjs/toolkit";

interface IBoard {
  getBoards(): Promise<any>;
  search(keyword: string): Promise<any>;
  createBoard(data: any): Promise<any>;
  getBoard(id: EntityId): Promise<any>;
  reorderColumn(id: EntityId, data: any): Promise<any>;
  starred(id: EntityId, starred: boolean): Promise<any>;
  updateCover(id: EntityId, cover: string): Promise<any>
  updateVisibility(id: EntityId, visibility: string): Promise<any>
  closed(id: EntityId, closed: boolean): Promise<any>
  editLabel(id: EntityId, title: string): Promise<any>
}

class Board implements IBoard {
  getBoards() {
    return API.get("/boards");
  }

  search(keyword: string) {
    return API.get(`/boards/search?keyword=${keyword}`);
  }

  createBoard(data: any) {
    return API.post("/boards", data);
  }

  getBoard(id: EntityId) {
    return API.get(`/boards/${id}`);
  }

  reorderColumn(id: EntityId, data: any) {
    return API.put(`/boards/reorderColumn/${id}`, data);
  }

  starred(id: EntityId, starred: boolean) {
    return API.put(`/boards/starred?boardId=${id}&starred=${starred}`);
  }

  updateCover(id: EntityId, cover: string): Promise<any> {
    return API.put(`/boards/cover?boardId=${id}&cover=${cover}`)
  }

  updateVisibility(id: EntityId, visibility: string): Promise<any> {
    return API.put(`/boards/visibility?boardId=${id}&visibility=${visibility}`)
  }

  closed(id: EntityId, closed: boolean): Promise<any> {
    return API.put(`/boards/closed?boardId=${id}&status=${closed}`)
  }

  editLabel(id: EntityId, title: string): Promise<any> {
    return API.put(`/boards/label?boardId=${id}&title=${title}`)
  }
}

export const BoardService = new Board();
