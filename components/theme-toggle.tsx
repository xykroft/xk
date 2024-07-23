"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      className="size-9 p-0"
      aria-label="Theme Toggle"
      onClick={changeTheme}
    >
      <Icons.sun className="flex h-[1.2rem] w-[1.2rem] dark:hidden" />
      <Icons.moon className="hidden h-[1.2rem] w-[1.2rem] dark:flex" />
    </Button>
  );
};
