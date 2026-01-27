import { PopoverContent } from "./popover";
import { useStackPopover } from "./popover-root";

export function StackPopoverContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { stack } = useStackPopover();

  const current =
    stack.length === 0 ? { content: children } : stack[stack.length - 1];

  return (
    <PopoverContent side="bottom" align="start">
      <div className="w-85">{current.content}</div>
    </PopoverContent>
  );
}
