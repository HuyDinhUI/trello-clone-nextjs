import { Recurring, Reminder } from "@/types/card-date.type";

export const DATA_RECURRING_OPTIONS: {
  label: string;
  value: Recurring;
}[] = [
  {
    label: "Never",
    value: "Never",
  },
  {
    label: "Daily",
    value: "Daily",
  },
  {
    label: "Monday to Friday",
    value: "MondaytoFriday",
  },
  {
    label: "Weekly",
    value: "Weekly",
  },
  {
    label: "Monthly on the 28th",
    value: "Monthlyonthe28th",
  },
  {
    label: "Monthly on the last Wednesday",
    value: "MonthlyonthelastWednesday",
  },
];

export const DATA_REMINDER_OPTIONS: {
  label: string;
  value: Reminder;
}[] = [
  {
    label: "None",
    value: "None",
  },
  {
    label: "At time of due date",
    value: "AtTime",
  },
  {
    label: "5 Minutes before",
    value: "5m",
  },
  {
    label: "10 Minutes before",
    value: "10m",
  },
  {
    label: "15 Minues before",
    value: "15m",
  },
  {
    label: "1 Hour before",
    value: "1h",
  },
  {
    label: "2 Hours before",
    value: "2h",
  },
  {
    label: "1 Day before",
    value: "1d",
  },
  {
    label: "2 Days before",
    value: "2d",
  },
];
