import API from "@/utils/axios";

interface IBoard {
  getBoards(): Promise<any>;
  search(keyword: string): Promise<any>;
  createBoard(data: any): Promise<any>;
  getBoard(id: string): Promise<any>;
  reorderColumn(id: string, data: any): Promise<any>;
  starred(id: string, starred: boolean): Promise<any>;
  updateCover(id: string, cover: string): Promise<any>
  updateVisibility(id: string, visibility: string): Promise<any>
  closed(id: string, closed: boolean): Promise<any>
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

  getBoard(id: string) {
    return API.get(`/boards/${id}`);
  }

  reorderColumn(id: string, data: any) {
    return API.put(`/boards/${id}`, data);
  }

  starred(id: string, starred: boolean) {
    return API.put(`/boards/starred?boardId=${id}&starred=${starred}`);
  }

  updateCover(id: string, cover: string): Promise<any> {
    return API.put(`/boards/cover?boardId=${id}&cover=${cover}`)
  }

  updateVisibility(id: string, visibility: string): Promise<any> {
    return API.put(`/boards/visibility?boardId=${id}&visibility=${visibility}`)
  }

  closed(id: string, closed: boolean): Promise<any> {
    return API.put(`/boards/closed?boardId=${id}&status=${closed}`)
  }
}

export const BoardService = new Board();
