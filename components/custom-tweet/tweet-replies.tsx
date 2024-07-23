import Link from "next/link";
import { type EnrichedTweet } from "react-tweet";

export const TweetReplies = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="px-0.5 pb-2 pt-4">
    <Link
      className="flex min-h-8 min-w-8 select-none items-center justify-center rounded-full border py-3.5 text-neutral-500 no-underline outline-0 outline-[none] transition-colors hover:bg-neutral-100/70 hover:text-neutral-950 focus-visible:border-neutral-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600/35 focus-visible:ring-offset-0 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50 dark:focus-visible:border-neutral-400/60 dark:focus-visible:ring-neutral-400/35"
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap break-words text-sm font-medium leading-4">
        Read more on X
      </span>
    </Link>
  </div>
);
