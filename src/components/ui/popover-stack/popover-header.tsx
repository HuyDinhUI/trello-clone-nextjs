import { ChevronLeft } from "lucide-react";
import { useStackPopover } from "./popover-root";
import { Button } from "../button";

export function StackPopoverHeader({ title }: { title?: string }) {
  const { stack, pop } = useStackPopover();

  if (stack.length === 0) return null;

  return (
    <div className="flex items-center gap-2 p-4">
      <Button
        variant="transparent"
        size="lb"
        icon={<ChevronLeft size={15} />}
        onClick={pop}
        className="text-sm opacity-70 hover:opacity-100 relative z-99"
      ></Button>
      <div className="absolute text-sm text-center right-0 left-0 font-bold">
        {title}
      </div>
    </div>
  );
}
