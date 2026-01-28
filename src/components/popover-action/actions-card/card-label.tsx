"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StackPopoverItem } from "@/components/ui/popover-stack/popover-item";
import { CardFacade } from "@/facades/card.facade";
import { Tag } from "@/types/board.type";
import clsx from "clsx";
import { Check, Paintbrush } from "lucide-react";
import { useActionCard } from ".";
import CheckboxDemo from "@/components/ui/checkbox";
import { useState } from "react";
import { DATA_LABEL_COLORS } from "@/mock/color-label-mock";
import { useStackPopover } from "@/components/ui/popover-stack/popover-root";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { labelsSelectors } from "@/store/label/label.selectors";
import { LabelFacade } from "@/facades/label.facade";

const CardLabel = () => {
  const { CardItem } = useActionCard();
  const labels = useAppSelector((state: RootState) =>
    labelsSelectors.selectAll(state),
  );

  return (
    <div className="p-3">
      <div>
        <Input placeholder="Search labels..." />
        <div>
          <div className="my-2">Labels</div>
          <div className="flex flex-col gap-2">
            {labels?.map((item) => (
              <label className="flex items-center gap-3" key={item._id}>
                <CheckboxDemo
                  color="blue"
                  shape="square"
                  checked={CardItem.tag.some((t) => t._id === item._id)}
                  onCheckedChange={() => {
                    console.log("change");
                    CardFacade.toggleLabel(CardItem._id, {
                      _id: item._id,
                      title: item.title,
                      color: item.color,
                    });
                  }}
                />
                <div
                  className={clsx(
                    "h-10 p-2 font-bold rounded-sm flex-1 hover:opacity-90",
                  )}
                  style={{ backgroundColor: `${item.color.code}` }}
                >
                  <span>{item.title ?? ""}</span>
                </div>
                <StackPopoverItem
                  title="Edit label"
                  next={<EditLabel label={item} />}
                >
                  <Button
                    icon={<Paintbrush size={13} />}
                    size="ic"
                    variant="icon"
                  />
                </StackPopoverItem>
              </label>
            ))}
          </div>
          <StackPopoverItem title="Create label" next={<AddLabel />}>
            <Button
              title="Create new label"
              className="w-full justify-center mt-2"
            />
          </StackPopoverItem>
        </div>
      </div>
    </div>
  );
};

const EditLabel = ({ label }: { label: Tag }) => {
  const { pop } = useStackPopover();
  const [title, setTitle] = useState<string | null>(label.title);
  const [color, setColor] = useState<{ name: string; code: string }>(
    label.color,
  );
  return (
    <div>
      <div className="bg-gray-50 flex justify-center items-center h-25 px-10">
        <div
          style={{ backgroundColor: `${color.code}` }}
          className="w-full h-10 p-2 font-bold rounded-sm"
        >
          <span>{title}</span>
        </div>
      </div>
      <div className="p-3">
        <label htmlFor="title" className="grid gap-2">
          <span>Title</span>
          <Input
            value={title ?? ""}
            onChange={(e) => setTitle(e.currentTarget.value)}
            id="title"
          />
        </label>
      </div>
      <div className="grid grid-cols-5 grid-rows-6 gap-2 p-3">
        {DATA_LABEL_COLORS.map((item) => (
          <div
            onClick={() => setColor(item)}
            key={item.code}
            style={{ backgroundColor: `${item.code}` }}
            className={clsx("h-8 rounded-sm flex justify-center items-center")}
          >
            {color.code === item.code && <Check size={20} color="white" />}
          </div>
        ))}
      </div>
      <hr className="border-gray-300 m-3" />
      <div className="flex justify-between px-3 pb-2">
        <Button
          onClick={() => {
            LabelFacade.updateLabel(label._id, {
              _id: label._id,
              title,
              color,
            });
            pop();
          }}
          size="sm"
          variant="primary"
          title="Save"
        />
        <Button
          onClick={() => {
            LabelFacade.removeLabel(label._id);
            pop();
          }}
          size="sm"
          variant="danger"
          title="Delete"
        />
      </div>
    </div>
  );
};

const AddLabel = () => {
  const { pop } = useStackPopover();
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<{ name: string; code: string }>({
    name: "green",
    code: "#7DCEA0",
  });
  return (
    <div>
      <div className="bg-gray-50 flex justify-center items-center h-25 px-10">
        <div
          style={{ backgroundColor: `${color.code}` }}
          className="w-full h-10 p-2 font-bold rounded-sm"
        >
          <span>{title}</span>
        </div>
      </div>
      <div className="p-3">
        <label htmlFor="title" className="grid gap-2">
          <span>Title</span>
          <Input
            value={title ?? ""}
            onChange={(e) => setTitle(e.currentTarget.value)}
            id="title"
          />
        </label>
      </div>
      <div className="grid grid-cols-5 grid-rows-6 gap-2 p-3">
        {DATA_LABEL_COLORS.map((item) => (
          <div
            onClick={() => setColor(item)}
            key={item.code}
            style={{ backgroundColor: `${item.code}` }}
            className={clsx(
              "h-8 rounded-sm",
              color.code === item.code && "outline-blue-500 outline-2",
            )}
          ></div>
        ))}
      </div>
      <hr className="border-gray-300 m-3" />
      <div className="flex justify-between px-3 pb-2">
        <Button
          onClick={() => {
            LabelFacade.addLabel(title, color);
            pop();
          }}
          size="sm"
          variant="primary"
          title="Create"
        />
      </div>
    </div>
  );
};

export default CardLabel;
