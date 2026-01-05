"use client";

import { Paperclip } from "lucide-react";
import ActionRoot from "../action-root";

const CardAttechment = () => {
  return (
    <ActionRoot
      titleButton="Attechments"
      titleHeader="Attechments"
      icon={<Paperclip size={18} />}
    >
      <div></div>
    </ActionRoot>
  );
};

export default CardAttechment