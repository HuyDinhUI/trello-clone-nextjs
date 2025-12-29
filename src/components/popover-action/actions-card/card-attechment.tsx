"use client";

import { Paperclip } from "lucide-react";
import ActionCardRoot from "./action-card-root";

const CardAttechment = () => {
  return (
    <ActionCardRoot
      titleButton="Attechments"
      titleHeader="Attechments"
      icon={<Paperclip size={18} />}
    >
      <div></div>
    </ActionCardRoot>
  );
};

export default CardAttechment