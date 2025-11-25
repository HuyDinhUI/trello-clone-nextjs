"use client";

import { Header } from "@/components/ui/header";
import { BoardProvider } from "@/context/boardContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="wrapper h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <BoardProvider>{children}</BoardProvider>
      </div>
    </div>
  );
};

export default MainLayout;
