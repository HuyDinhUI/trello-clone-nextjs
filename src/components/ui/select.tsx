"use client";

import { AriaAttributes, useRef, useState } from "react";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { ChevronDown } from "lucide-react";

export interface Option {
  label: string;
  value: string;
}

interface DropdownProps extends AriaAttributes {
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled,
  ...rest
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        {...rest}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex w-full items-center justify-between ring ring-gray-200 px-5 py-2 text-sm rounded-sm",
          disabled && "opacity-50 cursor-not-allowed", "aria-invalid:ring-red-500 aria-invalid:outline-red-500"
        )}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown size={15} />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-white shadow max-h-30 overflow-scroll">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={clsx(
                "cursor-pointer px-3 py-2 hover:bg-gray-100",
                option.value === value && "bg-gray-100"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
