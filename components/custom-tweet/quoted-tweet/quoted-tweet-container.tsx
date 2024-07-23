"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { type EnrichedQuotedTweet } from "react-tweet";

type Props = { tweet: EnrichedQuotedTweet; children: ReactNode };

export const QuotedTweetContainer = ({ tweet, children }: Props) => (
  <Link
    className="mt-3 block w-full cursor-pointer overflow-hidden rounded-xl border transition-[background-color,box-shadow] hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50"
    href={tweet.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <article className="relative">{children}</article>
  </Link>
);
