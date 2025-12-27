"use client";

import { Button } from "./button";
import { InputSearch } from "./input";
import {
  IconHelpCircle,
  IconBell,
  IconSun,
  IconMoon,
  IconLogout,
} from "@tabler/icons-react";
import { DropdownMenu } from "./dropdown";
import { useEffect, useState } from "react";
import AvatarDemo from "./avatar";
import { Popover } from "./popover";
import { CreateBoard } from "../boards/create-board";
import type { MenuItem } from "@/types/menu-item/menu-item-type";
import { HelpCircle, Settings2 } from "lucide-react";
import { AlertDialogLogout } from "@/mock/AlertDialog-MockData";
import API from "@/utils/axios";
import { toast } from "react-toastify";
import { SkeletonHeader } from "./skeleton";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";

export const Header = () => {
  const [theme, setTheme] = useState<string | null>("light");
  const { user, loading } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const getTheme = () => {
      setTheme(localStorage.getItem("theme"));
    };

    getTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme ?? "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const Logout = async () => {
    try {
      await API.delete("/authorization/logout");
      localStorage.removeItem("persist:root");
      window.location.href = "/auth/login";
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  const accountItems: MenuItem[] = [
    { label: user?.username ?? "", icon: <AvatarDemo /> },
    { label: "Settings", icon: <Settings2 size={16} /> },
    { label: "Help", icon: <HelpCircle size={16} /> },
    { separator: true },
    {
      label: "Logout",
      icon: <IconLogout size={16} />,
      onClick: () => Logout(),
      dialog: AlertDialogLogout,
    },
  ];

  if (loading) return <SkeletonHeader />;

  return (
    <div className="flex px-5 py-2 items-center border-b border-gray-200">
      <div className="w-[20%]">
        <Link className="flex gap-2 items-center" href={"/dashboard/boards"}>
          <Image src={"/logo.svg"} width={25} height={50} alt=""></Image>
          <span className="font-bold">Trello</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-center gap-2">
        <InputSearch />
        <Popover
          trigger={<Button title="Create" variant="primary" size="sm" />}
          side="bottom"
          sideOffset={10}
        >
          <div className="text-sm text-gray-800">
            <CreateBoard />
          </div>
        </Popover>
      </div>
      <div className="w-[25%] flex justify-end items-center">
        {theme === "light" ? (
          <Button
            variant="icon"
            size="ic"
            icon={<IconSun size={20} />}
            onClick={() => setTheme("dark")}
          />
        ) : (
          <Button
            variant="icon"
            size="ic"
            icon={<IconMoon size={20} />}
            onClick={() => setTheme("light")}
          />
        )}
        <Button variant="icon" size="ic" icon={<IconBell size={20} />} />
        <Button variant="icon" size="ic" icon={<IconHelpCircle size={20} />} />
        <DropdownMenu
          label="Account"
          side="bottom"
          align="end"
          trigger={<Button variant="icon" size="ic" icon={<AvatarDemo />} />}
          items={accountItems}
          size="md"
        />
      </div>
    </div>
  );
};
