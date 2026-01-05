"use client";

import { Tag } from "lucide-react";
import ActionRoot from "../action-root";

const CardLabel = () => {
  return (
    <ActionRoot
      titleButton="Labels"
      titleHeader="Labels"
      icon={<Tag size={18} />}
    >
      <div></div>
    </ActionRoot>
  );
};

export default CardLabel