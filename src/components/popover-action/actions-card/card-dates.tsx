"use client";

import { Button } from "@/components/ui/button";
import CheckboxDemo from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  DATA_RECURRING_OPTIONS,
  DATA_REMINDER_OPTIONS,
} from "@/mock/date-option-card";
import { type CardDate } from "@/types/card-date.type";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useActionCard } from ".";
import { CardFacade } from "@/facades/card.facade";
import { useStackPopover } from "@/components/ui/popover-stack/popover-root";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CardDate = () => {
  const { CardItem } = useActionCard();
  const [value, onChange] = useState<Value>(new Date());
  const [isStartDate, setIsStartDate] = useState<boolean>(
    CardItem.date.startDate ? true : false,
  );
  const [isDueDate, setIsDueDate] = useState<boolean>(true);
  const { pop } = useStackPopover();
  const form = useForm<CardDate>({
    defaultValues: {
      startDate: CardItem.date.startDate ?? "",
      dueDate: CardItem.date.dueDate ?? "",
      recurring: CardItem.date.recurring ?? "Never",
      reminder: CardItem.date.reminder ?? "None",
    },
  });

  const startDate = useWatch({ control: form.control, name: "startDate" });
  const dueDate = useWatch({ control: form.control, name: "dueDate" });

  const submit = (value: CardDate) => {
    CardFacade.updateDate(CardItem._id, value);
    pop();
  };

  const remove = () => {
    CardFacade.updateDate(CardItem._id, {
      startDate: "",
      dueDate: "",
      recurring: "Never",
      reminder: "None",
    });
    pop();
  };
  return (
    <div className="max-h-120 overflow-y-scroll">
      <div className="p-3">
        <Calendar
          onChange={onChange}
          value={value}
          minDate={new Date(startDate!) ?? new Date()}
          maxDate={new Date(dueDate!)}
        />
      </div>
      <form onSubmit={form.handleSubmit(submit)}>
        <Controller
          name="startDate"
          control={form.control}
          render={({ field }) => (
            <div className="p-3">
              <span>Start date</span>
              <div className="flex items-center gap-2 mt-1">
                <CheckboxDemo
                  shape="square"
                  color="blue"
                  checked={isStartDate}
                  onCheckedChange={(v) => {
                    if (!v) {
                      form.setValue("startDate", "");
                    }
                    setIsStartDate(v === true);
                  }}
                />
                <Input
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  disabled={!isStartDate}
                  type="date"
                />
              </div>
            </div>
          )}
        />

        <Controller
          name="dueDate"
          control={form.control}
          render={({ field }) => (
            <div className="p-3">
              <span>Due date</span>
              <div className="flex items-center gap-2 mt-1">
                <CheckboxDemo
                  shape="square"
                  color="blue"
                  checked={isDueDate}
                  onCheckedChange={(v) => {
                    if (!v) {
                      form.setValue("dueDate", "");
                    }
                    setIsDueDate(v === true);
                  }}
                />
                <Input
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  disabled={!isDueDate}
                  type="datetime-local"
                />
              </div>
            </div>
          )}
        />

        <Controller
          name="recurring"
          control={form.control}
          render={({ field }) => (
            <div className="p-3">
              <span>Recurring</span>
              <Select
                value={field.value}
                onChange={field.onChange}
                options={DATA_RECURRING_OPTIONS}
              />
            </div>
          )}
        />
        <Controller
          name="reminder"
          control={form.control}
          render={({ field }) => (
            <div className="p-3">
              <span>Set due date reminder</span>
              <Select
                value={field.value}
                onChange={field.onChange}
                options={DATA_REMINDER_OPTIONS}
              />
            </div>
          )}
        />

        <div className="p-3 flex flex-col gap-2">
          <Button
            type="submit"
            size="sm"
            className="justify-center"
            variant="primary"
            title="Save"
          />
          <Button
            type="button"
            size="sm"
            className="justify-center"
            title="Remove"
            onClick={() => remove()}
          />
        </div>
      </form>
    </div>
  );
};

export default CardDate;
