"use client";

import { useTweetStore } from "./store";
import { type TweetType } from "./zdb";
import { type Tweet } from "react-tweet/api";
import { CustomTweet } from "@/components/custom-tweet";
import { cn } from "@/utils";

export const PageTweets = () => {
  const tweets = useTweetStore((state) => state.tweets);

  return (
    <div className="mx-auto grid max-w-lg grid-cols-1 gap-4">
      <span
        className={cn(
          "mb-1 block text-sm text-neutral-600 dark:text-neutral-400",
          !tweets.length && "mx-auto"
        )}
      >
        designs, prototypes, experiments— <span className="italic">craft</span>.
      </span>
      {tweets.length &&
        tweets
          .filter((tweet) => "tweetJson" in tweet)
          .map((tweet) => {
            return (
              <CustomTweet
                key={(tweet as TweetType).tweetJson.id_str}
                tweetJson={(tweet as TweetType).tweetJson as Tweet}
                githubLink={tweet.githubLink}
                demoLink={tweet.demoLink}
              />
            );
          })}
    </div>
  );
};
