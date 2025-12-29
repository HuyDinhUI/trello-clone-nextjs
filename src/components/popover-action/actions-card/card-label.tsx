"use client";

import { Tag } from "lucide-react";
import ActionCardRoot from "./action-card-root";

const CardLabel = () => {
  return (
    <ActionCardRoot
      titleButton="Labels"
      titleHeader="Labels"
      icon={<Tag size={18} />}
    >
      <div></div>
    </ActionCardRoot>
  );
};

export default CardLabel