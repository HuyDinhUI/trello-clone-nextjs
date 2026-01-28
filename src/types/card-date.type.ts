export type Recurring =
  | "Never"
  | "Daily"
  | "MondaytoFriday"
  | "Weekly"
  | "Monthlyonthe28th"
  | "MonthlyonthelastWednesday";

export type Reminder =
  | "None"
  | "AtTime"
  | "5m"
  | "10m"
  | "15m"
  | "1h"
  | "2h"
  | "1d"
  | "2d";

export interface CardDate {
  startDate: string | null;
  dueDate: string | null;
  recurring: Recurring;
  reminder: Reminder;
}
