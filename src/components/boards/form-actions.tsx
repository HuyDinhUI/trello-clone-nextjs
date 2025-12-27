import { Board } from "@/types/board.type";
import { Popover } from "../ui/popover";
import { ChevronDown } from "lucide-react";
import { VISIBILITY } from "@/mock/visibility";
import clsx from "clsx";
import { useAppDispatch } from "@/hooks/useRedux";
import { AppDispatch } from "@/store";
import { updateBoard } from "@/store/boardSlice";

type props = {
  board: Board;
};

export const FormChangeVisibility = ({ board }: props) => {
  const dispath = useAppDispatch<AppDispatch>();

  return (
    <Popover
      trigger={
        <button className="cursor-pointer flex justify-between items-center ring ring-gray-400 rounded-[3px] p-2">
          <span>{board.visibility}</span>
          <ChevronDown size={15} />
        </button>
      }
      side="top"
      sideOffset={10}
    >
      <div className="w-[280px] text-sm">
        {VISIBILITY.map((item, i) => (
          <button
            key={i}
            onClick={() =>
              dispath(updateBoard({ field: "visibility", value: item.value }))
            }
            className={clsx(
              `flex w-full cursor-pointer items-center p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-sm ${
                board.visibility === item.value
                  ? "bg-blue-500/10 text-blue-500"
                  : ""
              }`
            )}
          >
            <div className="p-3 flex justify-center">{item.icon}</div>
            <div className="text-left px-2">
              <label className="font-bold">{item.title}</label>
              <p>{item.des}</p>
            </div>
          </button>
        ))}
      </div>
    </Popover>
  );
};
