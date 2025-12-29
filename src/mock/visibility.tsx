import { Earth, EarthLock, Users } from "lucide-react";

export const VISIBILITY = [
  {
    icon: <EarthLock />,
    value: "private",
    title: "Private",
    des: "Board members and Trello Workspace Workspace admins can see and edit this board.",
  },
  {
    icon: <Users />,
    value: "workspace",
    title: "Workspace",
    des: "All members of the Trello Workspace Workspace can see and edit this board.",
  },
  {
    icon: <Earth />,
    value: "public",
    title: "Public",
    des: "Anyone on the internet can see this board. Only board members can edit.",
  },
];