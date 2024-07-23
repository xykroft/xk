"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { XK_STORE_KEY } from "@/app/constants";
import { cn } from "@/utils";

export const ClearLocalStorageTweetStoreButton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Button
      className={cn("h-[36px] w-auto px-3", className)}
      variant="outline"
      onClick={() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(XK_STORE_KEY);
          window.location.reload();
        }
      }}
    >
      <span className="block text-[13px] leading-5">
        Clear localStorage Store
      </span>
    </Button>
  );
};
