"use client";

import { Plus } from "lucide-react";
import ActionRoot from "../action-root";

const AddToCard = () => {
  return (
    <ActionRoot
      titleButton="Add"
      titleHeader="Add to card"
      icon={<Plus size={18} />}
    >
      <div></div>
    </ActionRoot>
  );
};

export default AddToCard
