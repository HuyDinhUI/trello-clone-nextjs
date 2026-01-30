"use client";

import { Button } from "@/components/ui/button";
import { CheckList } from "@/types/card-checklist";
import { SquareCheckBig } from "lucide-react";
import ChecklistItem from "./checklist-item";
import InlineEditor from "@/components/ui/inline-editor/inline-editor";
import { percentCalculator } from "@/utils/helper";
import { CardFacade } from "@/facades/card.facade";
import { EntityId } from "@reduxjs/toolkit";
import clsx from "clsx";
import { useState } from "react";

type CheckListProps = {
  item?: CheckList;
  CardId: EntityId;
};

const Checklist = ({ item, CardId }: CheckListProps) => {
  const [onHideChecked, setOnHideChecked] = useState<boolean>(false);
  const percent = () => {
    if (!item?.process.total || !item.process.process) return 0;
    return percentCalculator(item.process.process, item.process.total);
  };
  return (
    <div className="px-5 pb-5">
      {/* header */}
      <header className="flex justify-between items-center gap-2">
        <div className="flex gap-5 items-center flex-1">
          <SquareCheckBig size={20} />
          <InlineEditor
            actionButton={false}
            title={item?.title ?? ""}
            handle={(v) =>
              CardFacade.editTitleChecklist(CardId, item?._id ?? "", v)
            }
            classname="flex items-center justify-between w-full h-5"
          >
            <strong>{item?.title}</strong>
          </InlineEditor>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOnHideChecked(!onHideChecked);
            }}
            size="sm"
            title={onHideChecked ? "Show checked items" : "Hide checked items"}
          />
          <Button
            onClick={() => CardFacade.removeChecklist(CardId, item?._id ?? "")}
            size="sm"
            title="Delete"
          />
        </div>
      </header>
      <div className="mt-3">
        {/* process */}
        <div className="flex gap-5 items-center">
          <span className="text-sm">{percent()}%</span>
          <div className="flex-1 h-2 rounded-full bg-gray-100">
            <div
              className={clsx(
                "h-full rounded-full transition-all",
                percent() === 100 ? "bg-green-800" : "bg-black",
              )}
              style={{
                width: `${percent()}%`,
              }}
            ></div>
          </div>
        </div>
        {/* content */}
        <div className="my-2 grid gap-2">
          {item?.items.map((i) => (
            <ChecklistItem
              classname={clsx(onHideChecked && i.status ? "hidden" : "block")}
              key={i._id}
              item={i}
              CardId={CardId}
              ChecklistId={item._id}
            />
          ))}
        </div>
      </div>
      <footer className="flex ms-10">
        <InlineEditor
          title=""
          handle={(v) =>
            CardFacade.addChecklistItem(CardId, item?._id ?? "", v)
          }
        >
          <Button autoFocus size="sm" title="Add an item" />
        </InlineEditor>
      </footer>
    </div>
  );
};

export default Checklist;
