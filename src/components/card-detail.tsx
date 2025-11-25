"use client";

import type { CardType } from "@/types/board/card";
import CheckboxDemo from "./ui/checkbox";
import { useEffect, useReducer, useRef, useState } from "react";
import { Popover } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Clock,
  Ellipsis,
  Image as Img,
  Plus,
  SquareCheckBig,
  Tag,
  TextAlignStart,
  UserPlus,
} from "lucide-react";
import { COVER_COLOR, COVER_PHOTOS } from "@/mock/cover-data";
import Image from "next/image";
import "quill/dist/quill.snow.css";
import Editor from "./ui/editor";
import API from "@/utils/axios";
import { useBoard } from "@/hooks/useBoard";

type CardDetailProps = {
  data: CardType;
};

const cardReducer = (state: CardType, action: any) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...action.card };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
  }
};

export const CardDetail = ({ data }: CardDetailProps) => {
  const [card, dispatch] = useReducer(cardReducer, data);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const { refresh } = useBoard();
  const [isInit, setIsInit] = useState(true);
  const updateTimer = useRef<any>(null);

  useEffect(() => {
    const getCard = async () => {
      try {
        const res = await API.get(`/card/get/card/${data._id}`);
        dispatch({
          type: "SET_DATA",
          card: res.data,
        });
        setIsInit(false);
      } catch (err: any) {
        console.log(err?.response);
      }
    };

    getCard();
  }, [data._id]);

  useEffect(() => {
    if (isInit) return;

    if (updateTimer.current) clearTimeout(updateTimer.current);

    updateTimer.current = setTimeout(async () => {
      await API.put("/card/update/content", card);
      refresh();
    }, 500);

    return () => clearTimeout(updateTimer.current);
  }, [card]);

  return (
    <div className={`flex flex-col max-h-dvh bg-white rounded-xl`}>
      {/* cover */}
      <div
        className={`bg-cover w-full border-b border-gray-200 relative group rounded-tl-xl rounded-tr-xl ${
          card?.cover ? "min-h-30" : "min-h-15"
        }`}
        style={{ backgroundImage: `url(${card?.cover})` }}
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
                          dispatch({
                            type: "UPDATE_FIELD",
                            value: c.url,
                            field: "cover",
                          })
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
                          dispatch({
                            type: "UPDATE_FIELD",
                            value: c.url,
                            field: "cover",
                          })
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
        {card?.cover && (
          <span
            onClick={() =>
              dispatch({
                type: "UPDATE_FIELD",
                value: "",
                field: "cover",
              })
            }
            className="absolute hidden group-hover:block bottom-2 right-3 text-sm bg-white rounded-md p-1 cursor-pointer"
          >
            Remove cover
          </span>
        )}
      </div>
      {/* Content */}
      <div className="flex overflow-hidden rounded-bl-xl rounded-br-xl">
        <div className="w-[60%] overflow-y-auto grid gap-5">
          <div className="px-5 pt-5 flex items-center gap-5">
            <CheckboxDemo
              onCheckedChange={(checked) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  value: checked === true,
                  field: "status",
                })
              }
              checked={card?.status}
            />
            <label className="text-xl font-bold">{card?.label}</label>
          </div>
          {/* actions */}
          <div className="px-5 flex gap-5">
            <div className="w-5"></div>
            <div className="flex gap-2 items-center">
              <Popover
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    title="Add"
                    icon={<Plus size={18} />}
                  />
                }
              >
                <div></div>
              </Popover>
              <Popover
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    title="Label"
                    icon={<Tag size={18} />}
                  />
                }
              >
                <div></div>
              </Popover>
              <Popover
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    title="Dates"
                    icon={<Clock size={18} />}
                  />
                }
              >
                <div></div>
              </Popover>
              <Popover
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    title="Checklists"
                    icon={<SquareCheckBig size={18} />}
                  />
                }
              >
                <div></div>
              </Popover>
              <Popover
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    title="Members"
                    icon={<UserPlus size={18} />}
                  />
                }
              >
                <div></div>
              </Popover>
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
              {!card?.description && !isOpenForm && (
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
        </div>
        <div className="flex-1 bg-gray-100 border-l border-gray-200 overflow-y-auto"></div>
      </div>
    </div>
  );
};
