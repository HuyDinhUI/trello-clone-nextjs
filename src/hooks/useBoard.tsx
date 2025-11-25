import { BoardContext } from "@/context/boardContext";
import { useContext } from "react";

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
