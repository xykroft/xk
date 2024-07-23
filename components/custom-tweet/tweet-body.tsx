import { type EnrichedTweet } from "react-tweet";
import { TweetLink } from "./tweet-link";

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <p className="whitespace-pre-wrap break-words px-0.5 text-[15px] font-normal leading-6">
    {tweet.entities.map((item, i) => {
      switch (item.type) {
        case "hashtag":
        case "mention":
        case "url":
        case "symbol":
          return (
            <TweetLink key={i} href={item.href}>
              {item.text}
            </TweetLink>
          );
        case "media":
          // Media text is currently never displayed, some tweets however might have indices
          // that do match `display_text_range` so for those cases we ignore the content.
          return;
        default:
          // We use `dangerouslySetInnerHTML` to preserve the text encoding.
          // https://github.com/vercel-labs/react-tweet/issues/29
          return (
            <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />
          );
      }
    })}
  </p>
);
