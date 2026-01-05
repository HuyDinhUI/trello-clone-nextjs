"use client";

import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
  titleButton?: string;
  titleHeader: string;
  icon: ReactNode;
};

const ActionRoot = ({
  children,
  titleButton,
  titleHeader,
  icon,
}: props) => {
  return (
    <Popover
      side="bottom"
      trigger={<Button size="sm" title={titleButton} icon={icon} />}
    >
      <div className="p-2 w-70 min-h-50">
        <header className="text-center font-bold">{titleHeader}</header>
        <main>{children}</main>
      </div>
    </Popover>
  );
};

export default ActionRoot;
