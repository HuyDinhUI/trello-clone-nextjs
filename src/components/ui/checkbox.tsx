"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

type CheckboxProps = {
  checked?: boolean;
  onCheckedChange: (checked: Checkbox.CheckedState) => void;
  classname?: string;
  color?: Color;
  shape?: "circle" | "square"
};

type Color = "green" | "blue" | "red" | "yellow" | "orange";

const ColorVariants = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  orange: "bg-amber-500",
};

const ShapeVariants = {
  circle: "rounded-full",
  square: "rounded-sm"
}

const CheckboxDemo = ({
  checked,
  onCheckedChange,
  classname,
  color = "green",
  shape = "circle"
}: CheckboxProps) => (
  <form>
    <div className="flex items-center">
      <Checkbox.Root
        className={`${classname} ${
          checked ? `${ColorVariants[color]}` : "bg-transparent"
        } flex size-[17px] ring-1 ring-gray-200 dark:ring-gray-50 cursor-pointer items-center justify-center ${ShapeVariants[shape]} outline-none hover:bg-violet3`}
        defaultChecked
        checked={checked}
        onCheckedChange={onCheckedChange}
        id="c1"
      >
        <Checkbox.Indicator className="text-white">
          <CheckIcon size={13} width={20} />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  </form>
);

export default CheckboxDemo;
