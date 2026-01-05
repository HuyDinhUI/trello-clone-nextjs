"use client";

import { Clock } from "lucide-react";
import ActionRoot from "../action-root";

const CardDate = () => {
  return (
    <ActionRoot
      titleButton="Dates"
      titleHeader="Dates"
      icon={<Clock size={18} />}
    >
      <div></div>
    </ActionRoot>
  );
};

export default CardDate