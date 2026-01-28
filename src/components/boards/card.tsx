"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { Clock, Edit, Paperclip, SquareCheckBig, Text, Trash } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import CheckboxDemo from "../ui/checkbox";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { CardDetail } from "./card-detail";
import { Card as CardType } from "@/types/board.type";
import { EntityId } from "@reduxjs/toolkit";
import { CardFacade } from "@/facades/card.facade";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { cardsSelectors } from "@/store/board/board.selectors";
import moment from "moment";


type CardProps = {
  CardId: EntityId;
};

export const Card = ({ CardId }: CardProps) => {
  const item = useAppSelector((state: RootState) =>
    cardsSelectors.selectById(state, CardId),
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id, data: { ...item } });

  const style = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleDeleteCard = () => {
    CardFacade.delete(item._id, item.columnId);
  };

  const markCard = async (columnId: EntityId, cardId: EntityId, value: any) => {
    CardFacade.marked(cardId, value, columnId);
  };

  return (
    <Dialog
      trigger={
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={`bg-white dark:bg-card rounded-xl group shadow-sm cursor-pointer border-2 border-transparent hover:border-blue-800 overflow-hidden relative ${
            item.FE_placeholderCard
              ? "opacity-0 h-1 p-0 mt-0 shadow-none border-none"
              : "opacity-100 mt-2"
          }`}
        >
          {/* cover */}
          {item.cover && (
            <div
              className="min-h-35 bg-cover"
              style={{ backgroundImage: `url("${item.cover}")` }}
            ></div>
          )}

          <div className="gap-2 px-3 py-2">
            {item.tag?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-1">
                {item.tag.map((item) => (
                  <div
                    key={item._id}
                    style={{ backgroundColor: `${item.color.code}` }}
                    className="text-[10px] px-2 h-5 flex items-center min-w-10 font-bold text-center rounded-sm"
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-1 items-center gap-2 group">
              <CheckboxDemo
                classname={`animate-checkbox ${
                  item.status ? "" : "hidden group-hover:block"
                }`}
                onCheckedChange={(checked) => {
                  markCard(item.columnId, item._id, checked === true);
                }}
                checked={item.status}
              />
              <span>{item.label}</span>
            </div>
            <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 absolute top-1 right-1">
              <Button
                className="bg-white rounded-full"
                variant="transparent"
                size="ic"
                icon={<Trash size={13} />}
                onClick={() => handleDeleteCard()}
              />
              <Button
                className="bg-white rounded-full"
                variant="transparent"
                size="ic"
                icon={<Edit size={13} />}
              />
            </div>
          </div>

          <div className="flex gap-3 items-center px-5">
            {(item.date.startDate || item.date.dueDate) && (
              <div className="flex gap-1 items-center text-sm pb-2">
                <Clock size={15}/>
                {moment(item.date.startDate).format("MMM D")} - {moment(item.date.dueDate).format("MMM D")}
              </div>
            )}
            {item.description && (
              <div className="pb-2">
                <Text size={15} />
              </div>
            )}
            {item.attachments?.length > 0 && (
              <div className="flex items-center gap-1 pb-2">
                <Paperclip size={15} />
                <span>1</span>
              </div>
            )}
            {item.checklist?.length > 0 && (
              <div className="flex gap-1 items-center pb-2">
                <SquareCheckBig size={15} />
                <span>1/3</span>
              </div>
            )}
          </div>
        </div>
      }
    >
      <CardDetail data={item}/>
    </Dialog>
  );
};

type ListCardProps = {
  items: CardType[];
};

export const ListCard = ({ items }: ListCardProps) => {
  return (
    <SortableContext
      items={items.map((item) => item._id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex flex-col">
        {items.map((item) => (
          <Card key={item._id} CardId={item._id} />
        ))}
      </div>
    </SortableContext>
  );
};
