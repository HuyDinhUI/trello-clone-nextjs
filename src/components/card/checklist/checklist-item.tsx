"use client";

import CheckboxDemo from "@/components/ui/checkbox";
import InlineEditor from "@/components/ui/inline-editor/inline-editor";
import { CheckListItem } from "@/types/card-checklist";

type CheckListItemProps = {
  item?: CheckListItem;
};

const ChecklistItem = ({ item }: CheckListItemProps) => {
  return (
    <div className="flex gap-5">
      <div className="py-1">
        <CheckboxDemo shape="square" color="blue" onCheckedChange={() => {}} />
      </div>
      <InlineEditor classname="w-full" title="test" handle={() => {}}>
        <div>Test</div>
      </InlineEditor>
    </div>
  );
};

export default ChecklistItem;
