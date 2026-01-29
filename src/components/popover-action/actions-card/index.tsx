import { Clock, Paperclip, Plus, SquareCheckBig, Tag } from "lucide-react";
import ActionRoot from "../action-root";
import { StackPopoverItem } from "@/components/ui/popover-stack/popover-item";
import AddToCard from "./add-to-card";
import CardLabel from "./card-label";
import CardChecklist from "./card-checklist";
import CardDate from "./card-dates";
import CardAttechment from "./card-attechment";
import { createContext, useContext, useState } from "react";
import { Card } from "@/types/board.type";

export const LIST_ACTIONS = [
  {
    title: "Labels",
    description: "Organize, categorize, and prioritize",
    icon: <Tag size={15} />,
    children: <CardLabel />,
  },
  {
    title: "Dates",
    description: "Start dates, and reminders",
    icon: <Clock size={15} />,
    children: <CardDate />,
  },
  {
    title: "Checklist",
    description: "Add subtasks",
    icon: <SquareCheckBig size={15} />,
    children: <CardChecklist />,
  },
  {
    title: "Attachment",
    description: "Add links, pages, work items, and more",
    icon: <Paperclip size={15} />,
    children: <CardAttechment />,
  },
];

type ActionCardContextType = {
  CardItem: Card;
  selectedAction: string;
  setSelectedAction: (action: string) => void;
};

export const ActionCardContext = createContext<ActionCardContextType | null>(
  null,
);

const ActionCard = ({ CardItem }: { CardItem: Card }) => {
  const [selectedAction, setSelectedAction] = useState<string>("");
  return (
    <ActionCardContext.Provider
      value={{ CardItem, selectedAction, setSelectedAction }}
    >
      <div className="flex gap-2">
        <ActionRoot
          titleButton="Add"
          titleHeader="Add to card"
          icon={<Plus size={18} />}
        >
          <div>
            <StackPopoverItem title="Add to card">
              <AddToCard />
            </StackPopoverItem>
          </div>
        </ActionRoot>
        {LIST_ACTIONS.map((item) => (
          <ActionRoot
            key={item.title}
            titleButton={item.title}
            titleHeader={item.title}
            icon={item.icon}
          >
            <div>
              <StackPopoverItem title={item.title}>
                {item.children}
              </StackPopoverItem>
            </div>
          </ActionRoot>
        ))}
      </div>
    </ActionCardContext.Provider>
  );
};

export const useActionCard = () => {
  const ctx = useContext(ActionCardContext);
  if (!ctx) throw new Error("Must be used inside ActionCard");
  return ctx;
};

export default ActionCard;
