import API from "@/utils/axios";
import { EntityId } from "@reduxjs/toolkit";

interface ICard {
  getCard(id: EntityId): Promise<any>;
  createCard(data: any): Promise<any>;
  updateOrderAndPosition(data: any): Promise<any>;
  updateContent(data: any): Promise<any>;
  deleteCard(id: EntityId): Promise<any>;
}

class Card implements ICard {
  getCard(id: EntityId) {
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

  deleteCard(id: EntityId) {
    return API.delete(`/card/delete/${id}`);
  }

  
}

export const CardService = new Card();
