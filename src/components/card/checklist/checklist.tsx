"use client";

import { Button } from "@/components/ui/button";
import { CheckList } from "@/types/card-checklist";
import { SquareCheckBig } from "lucide-react";
import ChecklistItem from "./checklist-item";
import InlineEditor from "@/components/ui/inline-editor/inline-editor";
import { percentCalculator } from "@/utils/helper";
import { CardFacade } from "@/facades/card.facade";
import { EntityId } from "@reduxjs/toolkit";

type CheckListProps = {
  item?: CheckList;
  CardId: EntityId;
};

const Checklist = ({ item, CardId }: CheckListProps) => {
  const percent = () => {
    if (!item?.process.total || !item.process.process) return 0;
    return percentCalculator(item.process.process, item.process.total);
  };
  return (
    <div className="px-5 pb-5">
      {/* header */}
      <header className="flex justify-between">
        <div className="flex gap-5 items-center">
          <SquareCheckBig size={20} />
          <strong>{item?.title}</strong>
        </div>
        <div className="flex gap-2">
          <Button size="sm" title="Hide checked items" />
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
              className="h-full rounded-full bg-black transition-all"
              style={{
                width: `${percent()}%`,
              }}
            ></div>
          </div>
        </div>
        {/* content */}
        <div className="my-2 grid gap-2">
          {item?.items.map((i) => (
            <ChecklistItem key={i._id} item={i} />
          ))}
        </div>
      </div>
      <footer className="flex ms-10">
        <InlineEditor title="" handle={() => {}}>
          <Button size="sm" title="Add an item" />
        </InlineEditor>
      </footer>
    </div>
  );
};

export default Checklist;
