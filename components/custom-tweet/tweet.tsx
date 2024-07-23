// adapted from https://react-tweet.vercel.app/twitter-theme/advanced;
// https://github.com/vercel/react-tweet/blob/main/packages/react-tweet/src/twitter-theme/embedded-tweet.tsx

import type { Tweet } from "react-tweet/api";
import { type TwitterComponents, enrichTweet } from "react-tweet";
import { TweetContainer } from "./tweet-container";
import { TweetHeader } from "./tweet-header";
import { TweetInReplyTo } from "./tweet-in-reply-to";
import { TweetBody } from "./tweet-body";
import { TweetMedia } from "./tweet-media";
import { TweetReplies } from "./tweet-replies";
import { QuotedTweet } from "./quoted-tweet";
import { useMemo } from "react";
import React from "react";
import { cn } from "@/utils";

type Props = {
  tweetJson: Tweet;
  className?: string;
  style?: React.CSSProperties;
  components?: Omit<TwitterComponents, "TweetNotFound">;
  shouldShowCustomElements?: boolean;
  githubLink?: string;
  demoLink?: string;
};

export const CustomTweet = React.forwardRef(
  (
    {
      tweetJson: t,
      className,
      style,
      components,
      shouldShowCustomElements = true,
      githubLink,
      demoLink,
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    // useMemo does nothing for RSC but it helps when the component is used in the client (e.g by SWR)
    const tweet = useMemo(() => enrichTweet(t), [t]);

    return (
      <TweetContainer
        ref={ref}
        className={cn(
          "group/tweet mx-auto min-w-[250px] max-w-[550px]",
          className
        )}
        style={{ ...style }}
      >
        <TweetHeader
          tweet={tweet}
          components={components}
          shouldShowCustomElements={shouldShowCustomElements}
          githubLink={githubLink}
          demoLink={demoLink}
        />
        {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
        <TweetBody tweet={tweet} />
        {tweet.mediaDetails?.length ? (
          <TweetMedia tweet={tweet} components={components} />
        ) : null}
        {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
        <TweetReplies tweet={tweet} />
      </TweetContainer>
    );
  }
);
CustomTweet.displayName = "CustomTweet";
