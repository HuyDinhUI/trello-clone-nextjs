"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { StackPopover } from "../ui/popover-stack/popover-root";
import { PopoverTrigger } from "../ui/popover-stack/popover";
import { StackPopoverContent } from "../ui/popover-stack/popover-content";
import { StackPopoverItem } from "../ui/popover-stack/popover-item";

type props = {
  children: ReactNode;
  titleButton?: string;
  titleHeader: string;
  icon: ReactNode;
};

const ActionRoot = ({ children, titleButton, titleHeader, icon }: props) => {
  return (
    <StackPopover>
      <PopoverTrigger asChild>
        <Button size="sm" title={titleButton} icon={icon} />
      </PopoverTrigger>

      <StackPopoverContent>
        <StackPopoverItem>
          <header className="text-center text-sm py-3 font-bold">{titleHeader}</header>
          {children}
        </StackPopoverItem>
      </StackPopoverContent>
    </StackPopover>
  );
};

export default ActionRoot;
