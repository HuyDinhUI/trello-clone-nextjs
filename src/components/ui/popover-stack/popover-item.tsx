import { StackPopoverHeader } from "./popover-header";
import { useStackPopover } from "./popover-root";

type StackItemProps = {
  children: React.ReactNode;
  next?: React.ReactNode;
  title?: string;
};

export function StackPopoverItem({
  children,
  next,
  title,
}: StackItemProps) {
  const { push } = useStackPopover();

  return (
    <div
      className="text-sm cursor-pointer hover:bg-muted"
      onClick={() => {
        if (next) {
          push({
            title,
            content: (
              <>
                <StackPopoverHeader title={title} />
                {next}
              </>
            ),
          });
        }
      }}
    >
      {children}
    </div>
  );
}
