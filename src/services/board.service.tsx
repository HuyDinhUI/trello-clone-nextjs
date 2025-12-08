import API from "@/utils/axios";

export const BoardService = {
  getBoards() {
    return API.get("/boards");
  },

  search (keyword: string) {
    return API.get(`/boards/search?keyword=${keyword}`)
  },

  createBoard(data: any) {
    return API.post("/boards", data);
  },

  getBoard(id: string) {
    return API.get(`/boards/${id}`);
  },

  reorderColumn(id: string, data: any) {
    return API.put(`/boards/${id}`,data)
  },

  starred(id: string, starred: boolean) {
    return API.put(`/boards/starred?boardId=${id}&starred=${starred}`)
  }
};
