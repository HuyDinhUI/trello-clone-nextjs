"use client";

import { StackPopoverItem } from "@/components/ui/popover-stack/popover-item";
import { LIST_ACTIONS } from ".";

const AddToCard = () => {
  return (
    <div className="py-2">
      {LIST_ACTIONS.map((item) => (
        <StackPopoverItem
          key={item.title}
          title={item.title}
          next={item.children}
        >
          <div className="flex gap-2 my-2 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-white/5">
            <div className="flex justify-center items-center w-10 h-10 p-2 ring ring-gray-300 rounded-sm">
              {item.icon}
            </div>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </div>
        </StackPopoverItem>
      ))}
    </div>
  );
};

export default AddToCard;
