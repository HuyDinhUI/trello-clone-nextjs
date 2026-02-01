import { Ellipsis, Plus, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListCard } from "../card/card";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown";
import type { MenuItem } from "@/types/menu-item/menu-item-type";
import { Card, Column as ColumnType } from "@/types/board.type";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { EntityId } from "@reduxjs/toolkit";
import { ColumnFacade } from "@/facades/column.facade";
import { CardFacade } from "@/facades/card.facade";
import InlineEditor from "../ui/inline-editor/inline-editor";

type ColummsProps = {
  label: string;
  children: ReactNode;
  id: EntityId;
  card: Card[];
};

export const Column = ({ label, children, id, card }: ColummsProps) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [labelInputCard, setLabelInputCard] = useState<string>("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, data: { label, id, card } });

  const style = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleCreateCard = async () => {
    CardFacade.add(labelInputCard, id);
    setLabelInputCard("");
  };

  const handleDeleteColumn = async () => {
    ColumnFacade.delete(id);
  };

  const ActionsBoardItems: MenuItem[] = [
    {
      label: "Add card",
      onClick() {
        setOpenCreate(true);
      },
    },
    { label: "Copy list", disabled: true },
    { label: "Move list", disabled: true },
    { label: "Move all card in this list", disabled: true },
    {
      label: "Sort by",
      children: [
        {
          label: "Date created (newest first)",
        },
        {
          label: "Date created (oldest first)",
        },
      ],
    },
    { separator: true },
    {
      label: "Archive this list",
      onClick() {
        handleDeleteColumn();
      },
    },
    { label: "Archive all cards in this list" },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-70 rounded-xl"
    >
      <div
        {...listeners}
        className="bg-white dark:bg-slate-900 rounded-xl cursor-pointer min-h-30 max-h-[80vh] relative"
      >
        <header className="flex justify-between gap-2 items-center p-2">
          <InlineEditor
            actionButton={false}
            title={label}
            handle={(v) => ColumnFacade.update(id, v)}
            classname="w-full px-2"
          >
            <div className="font-bold">{label}</div>
          </InlineEditor>

          <DropdownMenu
            side="bottom"
            align="start"
            items={ActionsBoardItems}
            label="List actions"
            trigger={
              <Button variant="icon" size="ic" icon={<Ellipsis size={18} />} />
            }
          />
        </header>
        <div className="pb-15 px-3 overflow-y-auto max-h-[70vh]">
          {children}
          {openCreate && (
            <div className="mt-5" autoFocus>
              <textarea
                onChange={(e) => setLabelInputCard(e.target.value)}
                autoFocus
                className="w-full resize-none p-2 rounded-md bg-white dark:bg-slate-800 shadow-md outline-blue-500"
                placeholder="Enter a title or past a link"
                value={labelInputCard}
              />
              <div className="w-full flex gap-2 mt-2 justify-start">
                <Button
                  onClick={() => handleCreateCard()}
                  variant="primary"
                  title="Add card"
                />
                <Button
                  onClick={() => setOpenCreate(false)}
                  variant="transparent"
                  icon={<X />}
                ></Button>
              </div>
            </div>
          )}
        </div>

        {!openCreate && (
          <div className="py-2 px-3 absolute bottom-0 right-0 left-0 rounded-bl-xl rounded-br-xl">
            <Button
              onClick={() => setOpenCreate(true)}
              variant="transparent"
              title="Add a card"
              size="sm"
              icon={<Plus size={20} />}
              className="w-full hover:bg-black/5 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

type ListColumnsProps = {
  columns: ColumnType[];
};

export const ListColumns = ({ columns }: ListColumnsProps) => {
  const { currenBoardId } = useAppSelector((state: RootState) => state.board);

  return (
    <SortableContext
      items={columns.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex p-5 gap-3 max-h-[80vh] overflow-x-scroll absolute">
        {columns.map((col) => (
          <Column key={col._id} id={col._id} label={col.title} card={col.cards}>
            <ListCard items={col.cards} />
          </Column>
        ))}
        <div className="w-70">
          <InlineEditor
            title=""
            handle={(v) => ColumnFacade.add(v, currenBoardId!)}
            classname="w-full"
          >
            <Button className="w-full bg-white/20 dark:bg-black/20 text-white rounded-xl" variant="transparent" title="Add another list" />
          </InlineEditor>
        </div>
      </div>
    </SortableContext>
  );
};
