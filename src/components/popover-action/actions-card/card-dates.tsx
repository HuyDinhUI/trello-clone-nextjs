"use client";

import { Clock } from "lucide-react";
import ActionCardRoot from "./action-card-root";

const CardDate = () => {
  return (
    <ActionCardRoot
      titleButton="Dates"
      titleHeader="Dates"
      icon={<Clock size={18} />}
    >
      <div></div>
    </ActionCardRoot>
  );
};

export default CardDate