import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
};

export const TweetLink = ({ href, children }: Props) => (
  <Link
    href={href}
    className="cursor-pointer text-neutral-500 no-underline hover:underline dark:text-neutral-400"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Link>
);
