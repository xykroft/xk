import { type EnrichedQuotedTweet } from "react-tweet";

type Props = { tweet: EnrichedQuotedTweet };

export const QuotedTweetBody = ({ tweet }: Props) => (
  <p className="mb-3 mt-1 whitespace-pre-wrap break-words px-3 py-0 text-[length:0.9375rem] font-[number:400] leading-5">
    {tweet.entities.map((item, i) => (
      <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />
    ))}
  </p>
);
