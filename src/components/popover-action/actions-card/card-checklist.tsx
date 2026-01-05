"use client";

import { SquareCheckBig } from "lucide-react";
import ActionRoot from "../action-root";

const CardChecklist = () => {
  return (
    <ActionRoot
      titleButton="Checklists"
      titleHeader="Checklists"
      icon={<SquareCheckBig size={18} />}
    >
      <div></div>
    </ActionRoot>
  );
};

export default CardChecklist