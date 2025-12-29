"use client";

import { Plus } from "lucide-react";
import ActionCardRoot from "./action-card-root";

const AddToCard = () => {
  return (
    <ActionCardRoot
      titleButton="Add"
      titleHeader="Add to card"
      icon={<Plus size={18} />}
    >
      <div></div>
    </ActionCardRoot>
  );
};

export default AddToCard
