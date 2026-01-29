"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CardFacade } from "@/facades/card.facade";
import { useState } from "react";
import { useActionCard } from ".";

const CardChecklist = () => {
  const [title, setTitle] = useState<string>("Checklist");
  const {CardItem} = useActionCard()
  return (
    <div className="p-3">
      <label htmlFor="cardlist-title" className="grid gap-1">
        <div>Title</div>
        <Input
          value={title}
          onChange={(v) => setTitle(v.currentTarget.value)}
          id="cardlist-title"
        />
      </label>
      <label htmlFor="cardlist-copyitem" className="grid gap-1 mt-3">
        <div className="font-bold">Copy items from...</div>
        <Select id="cardlist-copyitem" options={[]} />
      </label>
      <Button onClick={() => CardFacade.addChecklist(CardItem._id, title)} title="Add" variant="primary" className="mt-3" />
    </div>
  );
};

export default CardChecklist;
