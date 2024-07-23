"use client";

import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { tweets, type AddTweetType, type TweetType } from "./zdb";

type TweetStore = {
  tweets: TweetType[];
  addTweet: (tweet: AddTweetType) => void;
  updateTweet: (userTweet: TweetType) => void;
  updateTweetProperty: ({
    tweetSystemId,
    propertyName,
    newValue,
  }: {
    tweetSystemId: string;
    propertyName: keyof TweetType;
    newValue: unknown;
  }) => void;
  deleteTweet: (tweet: TweetType) => void;
  setTweets: (tweets: TweetType[]) => void;
};

export const useTweetStore = create<TweetStore>()(
  persist(
    (set) => ({
      tweets: [...tweets],
      addTweet: (tweet: AddTweetType) => {
        set((state) => ({
          tweets: [
            {
              systemId: uuidv4(),
              tweetAddedToSystem: new Date().toISOString(),
              ...tweet,
            },
            ...state.tweets,
          ],
        }));
      },
      updateTweet: (userTweet: TweetType) => {
        set((state) => ({
          tweets: [
            ...state.tweets.map((tweet) =>
              tweet.systemId === userTweet.systemId ? { ...userTweet } : tweet
            ),
          ],
        }));
      },
      updateTweetProperty: ({
        tweetSystemId,
        propertyName,
        newValue,
      }: {
        tweetSystemId: string;
        propertyName: keyof TweetType;
        newValue: unknown;
      }) => {
        set((state) => {
          return {
            tweets: [
              ...state.tweets.map((tweet) =>
                tweet.systemId === tweetSystemId
                  ? { ...tweet, [propertyName]: newValue }
                  : tweet
              ),
            ],
          };
        });
      },
      deleteTweet: (tweet: TweetType) => {
        set((state) => {
          const newTweets = [...state.tweets];
          newTweets.splice(
            state.tweets.findIndex(
              (addedTweet) => addedTweet.systemId === tweet.systemId
            ),
            1
          );
          return { tweets: newTweets };
        });
      },
      setTweets: (tweets: TweetType[]) => {
        set({ tweets: [...tweets] });
      },
    }),
    {
      name: "xk-zustand-store",
    }
  )
);

// from https://docs.pmnd.rs/zustand/integrations/persisting-store-data
export const useTweetStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useTweetStore.persist.onHydrate(() =>
      setHydrated(false)
    );

    const unsubFinishHydration = useTweetStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useTweetStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
