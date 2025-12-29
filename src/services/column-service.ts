import API from "@/utils/axios";

interface IColumn {
  createColumn(data: any): Promise<any>;
  updateColumn(data: any): Promise<any>;
  deleteColumn(id: string): Promise<any>;
}

class Column implements IColumn {
  createColumn(data: any) {
    return API.post(`/column`, data);
  }

  updateColumn(data: any) {
    return API.put(`/column`, data);
  }

  deleteColumn(id: string) {
    return API.delete(`/column/${id}`);
  }
}

export const ColumnService = new Column();
