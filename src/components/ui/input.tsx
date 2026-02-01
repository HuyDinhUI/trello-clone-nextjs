"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useAppSelector } from "@/hooks/useRedux";
import { BoardService } from "@/services/board-service";
import { RootState } from "@/store";
import { Board } from "@/types/board.type";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const InputSearch = () => {
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state: RootState) => state.user);
  const [keyword, setKeyword] = useState<string>("");
  const [boards, setBoards] = useState<Board[]>([]);
  const debounce = useDebounce(keyword, 500)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOnSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!keyword) return;

    const handleSearch = async () => {
      const res = await BoardService.search(keyword);
      setBoards(res.data);
    };

    handleSearch();
  }, [debounce, keyword]);
  return (
    <div
      ref={ref}
      className="flex items-center flex-1 rounded-sm relative ring ring-gray-300"
    >
      <div className="p-2">
        <IconSearch size={15} color="gray" />
      </div>
      <input
        value={keyword}
        onFocus={() => setOnSearch(true)}
        onChange={(e) => setKeyword(e.target.value)}
        className="outline-none w-full"
        placeholder="Search"
      ></input>
      {onSearch && (
        <div className="absolute w-full max-h-100 overflow-auto py-2 bg-white dark:bg-slate-800 top-10 rounded shadow-md z-999">
          <label className="uppercase text-[13px] text-gray-500 font-bold dark:text-gray-200 px-5">
            {!keyword ? "Recent boards" : "Boards"}
          </label>
          <div className="mt-3">
            {!keyword &&
              user.recentBoards.map((b) => (
                <Link
                  href={`/board/${b.board._id}`}
                  key={b.board._id}
                  className="flex gap-2 items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <div
                    className={`w-7 h-7 bg-cover rounded-sm`}
                    style={{ backgroundImage: `url(${b.board.cover})` }}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-sm leading-3">{b.board.title}</span>
                    <span className="text-sm text-gray-400">
                      {b.board.visibility}
                    </span>
                  </div>
                </Link>
              ))}

            {keyword && boards &&
              boards.map((b) => (
                <Link
                  href={`/board/${b._id}`}
                  key={b._id}
                  className="flex gap-2 items-center px-5 py-2 hover:bg-gray-100"
                >
                  <div
                    className={`w-7 h-7 bg-cover rounded-sm`}
                    style={{ backgroundImage: `url(${b.cover})` }}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-sm leading-3">{b.title}</span>
                    <span className="text-sm text-gray-400">
                      {b.visibility}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

type InputVariant = "default" | "primary" | "danger" | "borderNone";
type InputSize = "sm" | "md" | "lg";

type InputProps = {
  placeholder?: string;
  variant?: InputVariant;
  sizeOpt?: InputSize;
} & React.InputHTMLAttributes<HTMLInputElement>;

const variantClass: Record<InputVariant, string> = {
  default: "ring ring-gray-200 dark:ring-gray-500",
  primary: "",
  danger: "",
  borderNone: "",
};

const sizeClass: Record<InputSize, string> = {
  sm: "p-1",
  md: "p-2",
  lg: "",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, variant = "default", sizeOpt = "md", className, ...rest },
    ref
  ) => {
    const base = "w-full rounded-sm aria-invalid:ring-red-500 aria-invalid:outline-red-500";
    const finalClass = `${base} ${variantClass[variant]} ${sizeClass[sizeOpt]} ${className}`;

    return (
      <input
        ref={ref}
        className={finalClass}
        {...rest}
        placeholder={placeholder}
      ></input>
    );
  }
);

Input.displayName = "Input";
