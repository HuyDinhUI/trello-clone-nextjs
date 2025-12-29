"use client";

import { SquareCheckBig } from "lucide-react";
import ActionCardRoot from "./action-card-root";

const CardChecklist = () => {
  return (
    <ActionCardRoot
      titleButton="Checklists"
      titleHeader="Checklists"
      icon={<SquareCheckBig size={18} />}
    >
      <div></div>
    </ActionCardRoot>
  );
};

export default CardChecklist