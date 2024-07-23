"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddTweetForm } from "@/app/add-tweet-form";
import { useTweetStore, writeUpdatedStoreItemsToFile } from "@/app/store";
import { XK_STORE_KEY } from "@/app/constants";
import { cn } from "@/utils";

export const AddTweetButton = () => {
  const [showAddTweetDialog, setShowAddTweetDialog] = useState(false);

  return (
    <Dialog open={showAddTweetDialog} onOpenChange={setShowAddTweetDialog}>
      <DialogTrigger asChild>
        <Button className="h-[36px] w-auto px-3" variant="outline">
          <span className="block text-[13px] leading-5">Add Tweet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-3" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Add Tweet Form</DialogTitle>
        <div className="flex flex-col gap-2.5">
          <AddTweetForm closeDialog={() => setShowAddTweetDialog(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

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

export const SaveUpdatedStateToFileButton = () => {
  const store = useTweetStore((state) => state);

  return store.itemsToWriteToFile.length > 0 ? (
    <Button
      className="h-[36px] w-auto border px-3 shadow-sm"
      variant="secondary"
      onClick={() => {
        writeUpdatedStoreItemsToFile({ store });
      }}
    >
      <span className="block text-[13px] leading-5">
        Save Updated State To File
      </span>
    </Button>
  ) : (
    <></>
  );
};
