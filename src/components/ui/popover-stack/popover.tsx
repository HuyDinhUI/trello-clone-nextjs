// popover.tsx
"use client";

import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { X } from "lucide-react";

export const PopoverRoot = Popover.Root;
export const PopoverTrigger = Popover.Trigger;

export function PopoverContent({
  className,
  side = "right",
  align = "start",
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Popover.Content>) {
  return (
    <Popover.Portal>
      <Popover.Content
        side={side}
        align={align}
        sideOffset={6}
        className={clsx(
          "z-50 min-w-[220px] rounded-md bg-white dark:bg-gray-800 shadow-md relative",
          className,
        )}
        {...props}
      >
        {children}
        <Popover.Close
          className="absolute top-2 right-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10"
          aria-label="Close"
        >
          <X size={15} />
        </Popover.Close>
      </Popover.Content>
    </Popover.Portal>
  );
}
