"use client";

import { createContext, useContext, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../button";
import { useClickOutside } from "@/hooks/useClickOutSide";

type InlineEditorContextType = {
  isEditing: boolean;
  draft: string;
  setDraft: (v: string) => void;
  startEdit: () => void;
  cancelEdit: () => void;
  saveEdit: () => void;
};

const InlineEditorContext = createContext<InlineEditorContextType | null>(null);

export function InlineEditorRoot({
  value,
  onSave,
  children,
  withStart = false,
}: {
  value: string;
  onSave: (value: string) => void;
  children: React.ReactNode;
  withStart?: boolean;
}) {
  const [isEditing, setEditing] = useState(withStart);
  const [draft, setDraft] = useState(value);

  const startEdit = () => {
    setDraft(value); // reset khi mở edit
    setEditing(true);
  };

  const cancelEdit = () => setEditing(false);

  const saveEdit = () => {
    if (!draft) return
    onSave(draft);
    setEditing(false);
  };

  return (
    <InlineEditorContext.Provider
      value={{
        isEditing,
        draft,
        setDraft,
        startEdit,
        cancelEdit,
        saveEdit,
      }}
    >
      {children}
    </InlineEditorContext.Provider>
  );
}

InlineEditorRoot.View = function View({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) {
  const ctx = useContext(InlineEditorContext)!;

  if (ctx.isEditing) return null;

  return (
    <div onClick={ctx.startEdit} className={clsx("cursor-pointer", classname)}>
      {children}
    </div>
  );
};

InlineEditorRoot.Input = function InputField(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const { draft, setDraft } = useContext(InlineEditorContext)!;

  return (
    <textarea
      {...props}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      className="w-full p-2 ring ring-gray-200 rounded-sm"
      rows={1}
    ></textarea>
  );
};

InlineEditorRoot.Edit = function Edit({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = useContext(InlineEditorContext)!;
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    ctx.saveEdit();
    ctx.cancelEdit();
  });

  if (!ctx.isEditing) return null;

  return (
    <div ref={ref} className="space-y-2 w-full">
      {children}
    </div>
  );
};

InlineEditorRoot.Actions = function Actions() {
  const { saveEdit, cancelEdit } = useContext(InlineEditorContext)!;

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="primary"
        title="Save"
        onClick={saveEdit}
      ></Button>
      <Button size="sm" onClick={cancelEdit} title="Cancel"></Button>
    </div>
  );
};
