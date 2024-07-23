"use client";

import { useTweetStore } from "@/app/store";
import { type Tweet } from "react-tweet/api";
import { tweets as zdbTweets, type TweetType } from "../../zdb";
import { InfoIcon } from "lucide-react";
import { CustomTweet } from "@/components/custom-tweet";
import {
  ClearLocalStorageTweetStoreButton,
  SaveUpdatedStateToFileButton,
} from "@/components/nav-components";
import TweetLinksForm from "./tweet-links-form";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { NotFoundScreen } from "@/components/not-found-screen";

export default function TweetSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const tweets = useTweetStore((state) => state.tweets);
  const tweet = tweets.find(
    (tweet) => tweet.tweetId === params.slug.toString()
  );
  const zdbTweet = zdbTweets.find(
    (tweet) => tweet.tweetId === params.slug.toString()
  );

  const itemsToWriteToFile = useTweetStore((state) => state.itemsToWriteToFile);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return <NotFoundScreen />;
  }

  // if tweet is not in zdb (but may exist in client store) && is loading
  if (!zdbTweet && isLoading) {
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-screen items-center justify-center bg-white dark:bg-neutral-950">
        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          <Icons.spinner className="size-7" />
          <span className="block text-sm text-neutral-400 dark:text-neutral-500">
            Loading tweet...
          </span>
        </div>
      </div>
    );
  }

  // return tweet page if (client) tweet exists; otherwise, return 404 screen
  return tweet ? (
    <div className="mx-auto min-h-screen w-full">
      <div className="fixed bottom-0 left-0 right-[450px] top-0 mx-auto flex min-h-screen w-full max-w-[calc(100vw-450px)] flex-col overflow-scroll px-4 sm:px-8">
        <div className="min-h-auto flex w-full flex-1 items-center justify-center py-16">
          <CustomTweet
            className="max-w-lg"
            tweetJson={(tweet as TweetType).tweetJson as Tweet}
            shouldShowCustomElements={false}
          />
        </div>
      </div>
      <div className="fixed right-0 top-0 flex h-full w-[450px] flex-col border-l p-4">
        <div className="mb-8 flex items-center justify-between gap-2">
          <div className="flex h-[36px] items-center gap-2">
            <InfoIcon className="size-[18px]" />
            <span className="block font-medium">Info</span>
          </div>
          <SaveUpdatedStateToFileButton />
        </div>
        <TweetLinksForm tweet={tweet} />
        {itemsToWriteToFile.length > 0 && (
          <ClearLocalStorageTweetStoreButton className="h-10 w-full" />
        )}
      </div>
    </div>
  ) : (
    <NotFoundScreen />
  );
}
