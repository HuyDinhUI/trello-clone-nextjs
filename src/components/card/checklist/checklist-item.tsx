"use client";

import { Button } from "@/components/ui/button";
import CheckboxDemo from "@/components/ui/checkbox";
import InlineEditor from "@/components/ui/inline-editor/inline-editor";
import { CardFacade } from "@/facades/card.facade";
import { CheckListItem } from "@/types/card-checklist";
import { EntityId } from "@reduxjs/toolkit";
import clsx from "clsx";
import { Trash } from "lucide-react";

type CheckListItemProps = {
  item?: CheckListItem;
  CardId: EntityId;
  ChecklistId: EntityId;
  classname?: string;
};

const ChecklistItem = ({
  item,
  CardId,
  ChecklistId,
  classname,
}: CheckListItemProps) => {
  return (
    <div className={clsx("flex gap-5", classname)}>
      <div className="py-3">
        <CheckboxDemo
          checked={item?.status}
          shape="square"
          color="blue"
          onCheckedChange={(v) =>
            CardFacade.updateStatusChecklistItem(
              CardId,
              ChecklistId,
              item?._id ?? "",
              v === true,
            )
          }
        />
      </div>
      <InlineEditor
        classname="w-full"
        title={item?.label ?? ""}
        handle={(v) =>
          CardFacade.editLabelCheckListItem(
            CardId,
            ChecklistId,
            item?._id ?? "",
            v,
          )
        }
      >
        <div
          className={clsx(
            "hover:bg-gray-100 dark:hover:bg-white/5 min-h-10 px-2 rounded-sm flex items-center justify-between py-1 group",
            item?.status && "line-through",
          )}
        >
          {item?.label}
          <div className="group-hover:block hidden">
            {/* <Button variant="icon" size="ic" icon={<Clock size={13} />} />
            <Button variant="icon" size="ic" icon={<UserPlus size={13} />} /> */}
            <Button
              onClick={() =>
                CardFacade.removeChecklistItem(
                  CardId,
                  ChecklistId,
                  item?._id ?? "",
                )
              }
              variant="icon"
              size="ic"
              icon={<Trash size={13} />}
            />
          </div>
        </div>
      </InlineEditor>
    </div>
  );
};

export default ChecklistItem;
