import { Tag } from "@/types/board.type";

export const DATA_MOCK_TAGS_INIT: Tag[] = [
  {
    _id: "1",
    title: "Done",
    color: {
      name: "green",
      code: "#7DCEA0",
    },
  },
  {
    _id: "2",
    title: "System",
    color: {
      name: "yello",
      code: "#F4D03F",
    },
  },
  {
    _id: "3",
    title: "Support",
    color: {
      name: "orange",
      code: "#F39C12",
    },
  },
  {
    _id: "4",
    title: null,
    color: {
      name: "bold red",
      code: "#C0392B",
    },
  },
  {
    _id: "5",
    title: null,
    color: {
      name: "purple",
      code: "#BB8FCE",
    },
  },
  {
    _id: "6",
    title: "In process",
    color: {
      name: "blue",
      code: "#85C1E9",
    },
  },
];
