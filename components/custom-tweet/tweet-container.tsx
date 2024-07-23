import { cn } from "@/utils";
import React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const TweetContainer = React.forwardRef(
  (
    { className, style, children }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      className={cn(
        "react-tweet-themex w-full overflow-hidden rounded-lg border bg-white p-4 pb-4 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50",
        className
      )}
      style={{ ...style }}
    >
      <article className="relative">{children}</article>
    </div>
  )
);
TweetContainer.displayName = "TweetContainer";
