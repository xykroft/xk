import Link from "next/link";
import { type EnrichedTweet } from "react-tweet";

export const TweetInReplyTo = ({ tweet }: { tweet: EnrichedTweet }) => (
  <Link
    href={tweet.in_reply_to_url ?? "#"}
    className="mb-1 whitespace-pre-wrap break-words text-[0.9375rem] leading-5 text-neutral-600 no-underline hover:underline dark:text-neutral-400"
    target="_blank"
    rel="noopener noreferrer"
  >
    Replying to @{tweet.in_reply_to_screen_name}
  </Link>
);
