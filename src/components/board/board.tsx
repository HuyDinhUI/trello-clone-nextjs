"use client";

import { type ReactNode } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { Board } from "@/types/board.type";
import { BoardFacade } from "@/facades/board.facade";

type BoardVariant = "default" | "primary";

export type BoardItemProps = {
  type: BoardVariant;
  board: Board;
};

export const BoardItem = ({ type, board }: BoardItemProps) => {
  const handleStarred = async (starred: boolean) => {
    BoardFacade.starred(board._id, starred);
  };

  

  return (
    <div className="shadow-sm dark:bg-slate-900 rounded-md overflow-hidden">
      <Link href={`/board/${board._id}`}>
        <div className="flex flex-col">
          <div
            className="h-[72px] w-full bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${board.cover}')` }}
          >
            <div className="h-full w-full hover:bg-black/10 group overflow-hidden relative">
              <button
                onClick={(e) => {
                  handleStarred(!board.starred);
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className={`absolute top-2 right-2 bg-black/20 rounded p-1 text-white duration-300 transition-transform  delay-100 ${
                  board.starred
                    ? "opacity-100 translate-x-0"
                    : "group-hover:opacity-100 translate-x-10 group-hover:translate-x-0"
                }`}
              >
                {!board.starred ? (
                  <IconStar size={18} />
                ) : (
                  <IconStarFilled type="solid" size={18} color="white" />
                )}
              </button>
            </div>
          </div>
          <div className="p-2 flex items-center">
            <span className="dark:text-white">{board.title}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

type BoardContainerProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export const BoardContainer = ({
  icon,
  title,
  children,
}: BoardContainerProps) => {
  return (
    <div className="pb-13">
      <div className="flex items-center gap-3 mb-5">
        {icon}
        <span className="font-bold text-[15px]">{title}</span>
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
};

type BoardWorkspaceProps = {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
};

export const BoardWorkspace = ({
  label,
  children,
  icon,
}: BoardWorkspaceProps) => {
  return (
    <div>
      <div className="flex gap-3 mb-5 items-center">
        <label className="uppercase font-bold text-gray-700 dark:text-white/50">
          {label}
        </label>
        {icon && icon}
      </div>
      {children}
    </div>
  );
};
