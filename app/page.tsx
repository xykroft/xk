import { MainNav } from "@/components/main-nav";
import { tweets, type TweetType } from "./zdb";
import { CustomTweet } from "@/components/custom-tweet";
import { Tweet } from "react-tweet/api";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[2000px] px-4 pb-12 pt-1">
        {tweets.length ? (
          <div className="mx-auto grid max-w-lg grid-cols-1 gap-4">
            <span className="mb-1 block text-sm text-neutral-600 dark:text-neutral-400">
              designs, prototypes, experiments—{" "}
              <span className="italic">craft</span>.
            </span>
            {tweets
              .filter((tweet) => "tweetJson" in tweet)
              .map((tweet) => {
                return (
                  <CustomTweet
                    key={(tweet as TweetType).tweetJson.id_str}
                    tweetJson={(tweet as TweetType).tweetJson as Tweet}
                  />
                );
              })}
          </div>
        ) : (
          <span>Work in progress.</span>
        )}
      </div>
    </div>
  );
}
