"use client";

import CheckboxDemo from "../ui/checkbox";
import { useEffect, useState } from "react";
import { Popover } from "../ui/popover";
import { Button } from "../ui/button";
import { Ellipsis, Image as Img, TextAlignStart } from "lucide-react";
import { COVER_COLOR, COVER_PHOTOS } from "@/mock/cover-data";
import Image from "next/image";
import "quill/dist/quill.snow.css";
import Editor from "../ui/editor";
import { Card } from "@/types/board.type";
import { CardFacade } from "@/facades/card.facade";
import ActionCard from "../popover-action/actions-card";
import { LabelFacade } from "@/facades/label.facade";
import moment from "moment";
import Checklist from "./checklist/checklist";

type CardDetailProps = {
  data: Card;
};

export const CardDetail = ({ data }: CardDetailProps) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  useEffect(() => {
    LabelFacade.loadAll();
  }, []);
  return (
    <div className={`flex flex-col max-h-dvh bg-white rounded-xl`}>
      {/* cover */}
      <div
        className={`bg-cover w-full border-b border-gray-200 relative group rounded-tl-xl rounded-tr-xl ${
          data?.cover ? "min-h-30" : "min-h-15"
        }`}
        style={{ backgroundImage: `url(${data?.cover})` }}
      >
        <div className="absolute px-15 right-0 top-3.5 flex gap-2 items-center">
          <Popover
            side="bottom"
            align="start"
            trigger={
              <Button
                className="bg-white rounded-full"
                variant="transparent"
                size="ic"
                icon={<Img size={15} />}
              />
            }
          >
            <div className="w-70 min-h-50 bg-white">
              <header className="py-1">
                <h1 className="text-center font-bold">Cover</h1>
              </header>
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-sm font-bold">Colors</h2>
                  <div className="grid grid-cols-5 gap-2">
                    {COVER_COLOR.map((c, i) => (
                      <Image
                        onClick={() =>
                          CardFacade.changeCoverCard(
                            data._id,
                            c.url,
                            data.columnId,
                          )
                        }
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
                        onClick={() =>
                          CardFacade.changeCoverCard(
                            data._id,
                            c.url,
                            data.columnId,
                          )
                        }
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
          </Popover>
          <Popover
            trigger={
              <Button
                className="bg-white rounded-full"
                variant="transparent"
                size="ic"
                icon={<Ellipsis size={15} />}
              />
            }
          >
            <div className="w-70 min-h-50 bg-white"></div>
          </Popover>
        </div>
        {data?.cover && (
          <span
            onClick={() =>
              CardFacade.changeCoverCard(data._id, "", data.columnId)
            }
            className="absolute hidden group-hover:block bottom-2 right-3 text-sm bg-white rounded-md p-1 cursor-pointer"
          >
            Remove cover
          </span>
        )}
      </div>
      {/* Content */}
      <div className="flex overflow-hidden rounded-bl-xl rounded-br-xl">
        <div className="w-[60%] max-h-150 overflow-y-auto grid gap-5">
          <div className="px-5 pt-5 flex items-center gap-5">
            <CheckboxDemo
              onCheckedChange={(checked) =>
                CardFacade.marked(data._id, checked === true, data.columnId)
              }
              checked={data?.status}
            />
            <label className="text-xl font-bold">{data?.label}</label>
          </div>
          {/* actions */}
          <div className="px-5 flex gap-5">
            <div className="w-5"></div>
            <div className="flex gap-2 items-center">
              <ActionCard CardItem={data} />
            </div>
          </div>
          {/*  */}
          <div className="px-5 flex gap-5">
            <div className="w-5"></div>
            <div className="flex gap-2">
              {/* Members */}
        
              {/* Labels */}
              {data.tag.length > 0 && (
                <div className="flex gap-1">
                  {data.tag.map((item) => (
                    <div
                      key={item._id}
                      className="h-7 min-w-10 px-2 flex items-center font-bold rounded-sm"
                      style={{ backgroundColor: `${item.color.code}` }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
              {(data.date.dueDate || data.date.startDate) && (
                <div className="h-7 min-w-10 px-2 flex items-center font-bold rounded-sm bg-gray-200">
                  {moment(data.date.startDate).format("MMM D")} - {moment(data.date.dueDate).format("MMM D, h:mm a")}
                </div>
              )}
            </div>
          </div>
          {/* description */}
          <div className="px-5 flex flex-col gap-2">
            <div className="flex gap-5 items-center">
              <TextAlignStart size={20} />
              <span className="font-bold">Description</span>
            </div>
            <div className={`flex gap-5 pb-10 ${isOpenForm ? "min-h-80" : ""}`}>
              <div className="w-5"></div>
              {!data?.description && !isOpenForm && (
                <div className="flex-1">
                  <div
                    onClick={() => setIsOpenForm(true)}
                    className="ring ring-gray-200 px-2 pt-2 pb-10 w-full rounded-sm hover:bg-gray-200 cursor-pointer"
                  >
                    <p>Add a more detailed description...</p>
                  </div>
                </div>
              )}
              {/* form create description */}
              {isOpenForm && (
                <div className="w-full max-h-50">
                  <Editor show={isOpenForm} />
                  <div className="flex gap-2 pt-2">
                    <Button variant="primary" title="Save" />
                    <Button
                      onClick={() => setIsOpenForm(false)}
                      title="Cancel"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Checklist */}
          <div className="grid gap-5">
            {data.checklist.map(item => (
              <Checklist key={item._id} item={item} CardId={data._id}/>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-gray-100 border-l border-gray-200 overflow-y-auto"></div>
      </div>
    </div>
  );
};
