import API from "@/utils/axios";
import { EntityId } from "@reduxjs/toolkit";

interface IColumn {
  createColumn(data: any): Promise<any>;
  updateColumn(data: any): Promise<any>;
  deleteColumn(id: EntityId): Promise<any>;
}

class Column implements IColumn {
  createColumn(data: any) {
    return API.post(`/column`, data);
  }

  updateColumn(data: any) {
    return API.put(`/column`, data);
  }

  deleteColumn(id: EntityId) {
    return API.delete(`/column/${id}`);
  }
}

export const ColumnService = new Column();
