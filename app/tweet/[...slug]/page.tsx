"use client";

import { notFound } from "next/navigation";
import { CustomTweet } from "@/components/custom-tweet";
import { Tweet } from "react-tweet/api";
import { TweetType, tweets } from "../../zdb";
import { InfoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

const TweetSlugPage = ({ params }: { params: { slug: string } }) => {
  const tweetRef = useRef<HTMLDivElement | null>(null);
  const tweet = tweets.find(
    (tweet) => tweet.tweetId === params.slug.toString()
  );

  if (!tweet) {
    notFound();
  }

  return (
    <div className="mx-auto min-h-screen w-full">
      <div className="fixed bottom-0 left-0 right-[450px] top-0 mx-auto flex min-h-screen w-full max-w-[calc(100vw-450px)] flex-col overflow-scroll px-4 sm:px-8">
        <div className="m-0 flex h-full w-full flex-1 items-center justify-center">
          <CustomTweet
            ref={tweetRef}
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
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="mb-0 block text-sm font-medium">Tweet Link</span>
            <Input name="tweet-link" placeholder="Tweet Link" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="mb-0 block text-sm font-medium">Github Link</span>
            <Input name="github-link" placeholder="Github Link" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="mb-0 block text-sm font-medium">
              External Link
            </span>
            <Input name="external-link" placeholder="External Link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetSlugPage;
