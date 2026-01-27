"use client";

import { createContext, useContext, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

type Page = {
  title?: string;
  content: React.ReactNode;
};

type StackPopoverContextType = {
  stack: Page[];
  push: (page: Page) => void;
  pop: () => void;
};

export const StackPopoverContext =
  createContext<StackPopoverContextType | null>(null);

export function StackPopover({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<Page[]>([]);

  const push = (page: Page) => setStack((prev) => [...prev, page]);

  const pop = () => setStack((prev) => prev.slice(0, -1));

  return (
    <StackPopoverContext.Provider value={{ stack, push, pop }}>
      <Popover.Root onOpenChange={() => setStack([])}>{children}</Popover.Root>
    </StackPopoverContext.Provider>
  );
}

export const useStackPopover = () => {
  const ctx = useContext(StackPopoverContext);
  if (!ctx) throw new Error("Must be used inside StackPopover");
  return ctx;
};
