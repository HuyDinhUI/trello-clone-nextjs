import API from "@/utils/axios";

interface ICard {
  getCard(id: string): Promise<any>;
  createCard(data: any): Promise<any>;
  updateOrderAndPosition(data: any): Promise<any>;
  updateContent(data: any): Promise<any>;
  deleteCard(id: string): Promise<any>;
}

class Card implements ICard {
  getCard(id: string) {
    return API.get(`/card/get/card/${id}`);
  }

  createCard(data: any) {
    return API.post(`/card`, data);
  }

  updateOrderAndPosition(data: any) {
    return API.put(`/card/updateOrderAndPosition`, data);
  }

  updateContent(data: any) {
    return API.put(`/card/update/content`, data);
  }

  deleteCard(id: string) {
    return API.delete(`/card/delete/${id}`);
  }
}

export const CardService = new Card();
