import { VISIBILITY } from "@/mock/visibility";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppDispatch, RootState } from "@/store";
import { updateBoard } from "@/store/boardSlice";
import { COVER_COLOR, COVER_PHOTOS } from "@/mock/cover-data";
import Image from "next/image";
import { BoardService } from "@/services/board-service";
import AlertDialogDemo from "../ui/alert-dialog";

export const FormChangeVisibility = () => {
  const dispath = useAppDispatch<AppDispatch>();
  const { board } = useAppSelector((state: RootState) => state.board);

  const handleChangeVisibility = async (visibility: string) => {
    dispath(updateBoard({ field: "visibility", value: visibility }));

    await BoardService.updateVisibility(board._id!, visibility);
  };

  return (
    <div className="w-[280px] text-sm">
      {VISIBILITY.map((item, i) => (
        <AlertDialogDemo
          label="Are you sure?"
          description={item.des}
          key={i}
          onclick={() => handleChangeVisibility(item.value)}
          trigger={
            <button
              key={i}
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
          }
        />
      ))}
    </div>
  );
};

export const FormChangeCover = () => {
  const dispath = useAppDispatch<AppDispatch>();
  const { board } = useAppSelector((state: RootState) => state.board);

  const handleChangeCover = async (cover: string) => {
    dispath(updateBoard({ field: "cover", value: cover }));

    await BoardService.updateCover(board._id!, cover);
  };

  return (
    <div className="w-[280px] p-2">
      <header className="py-1">
        <h1 className="text-center font-bold">Cover</h1>
      </header>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-sm font-bold">Colors</h2>
          <div className="grid grid-cols-5 gap-2">
            {COVER_COLOR.map((c, i) => (
              <Image
                onClick={() => handleChangeCover(c.url)}
                key={i}
                src={c.url}
                alt={c.alt}
                width={50}
                height={30}
                className="rounded cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold">Photos</h2>
          <div className="grid grid-cols-3 gap-2">
            {COVER_PHOTOS.map((c, i) => (
              <Image
                onClick={() => handleChangeCover(c.url)}
                key={i}
                src={c.url}
                alt={c.alt}
                width={100}
                height={30}
                className="rounded cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
