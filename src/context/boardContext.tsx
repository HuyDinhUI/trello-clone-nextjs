"use client";

import { Columns } from "@/components/boards/columns";
import API from "@/utils/axios";
import { useParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface BoardContextType {
  board: any;
  setBoard: React.Dispatch<React.SetStateAction<any | null>>;
  columns: Columns[];
  setColumns: React.Dispatch<React.SetStateAction<Columns[]>>;
  refresh: () => void;
  loading: boolean;
  error: any;
}

interface BoardProviderProps {
  children: React.ReactNode;
}

const BoardContext = createContext<BoardContextType | null>(null);

const BoardProvider = ({ children }: BoardProviderProps) => {
  const [board, setBoard] = useState<any>(null);
  const [columns, setColumns] = useState<Columns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await API.get(`/boards/${id}`);
        setBoard(res.data);
        setColumns(res.data.columnsOrder);
      } catch (err: any) {
        setError(err);
        setBoard(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [id]);

  const refresh = async () => {
    try {
      const res = await API.get(`/boards/${id}`);
      setBoard(res.data);
      setColumns(res.data.columnsOrder);
    } catch (err: any) {
      setError(err);
      setBoard(null);
    }
  };

  return (
    <BoardContext.Provider
      value={{ board, columns, setBoard, setColumns, refresh, loading, error }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardProvider };
