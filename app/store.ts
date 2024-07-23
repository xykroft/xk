"use client";

import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { writeFileAtKey } from "@/utils";
import { tweets, type AddTweetType, type TweetType } from "./zdb";
import { XK_STORE_KEY, XK_TWEETS_KEY } from "./constants";

type UpdateItemsToWriteToFileType = {
  items: Array<"tweets">;
};

type TweetStore = {
  tweets: TweetType[];
  addTweet: (newTweet: AddTweetType) => void;
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
  itemsToWriteToFile: UpdateItemsToWriteToFileType["items"];
  updateItemsToWriteToFile: ({ items }: UpdateItemsToWriteToFileType) => void;
  clearItemsToWriteToFile: () => void;
};

const shouldWriteToFile = true;

export const useTweetStore = create<TweetStore>()(
  persist(
    (set, get) => ({
      tweets: [...tweets],
      addTweet: (newTweet: AddTweetType) => {
        set((state) => ({
          tweets: [
            {
              systemId: uuidv4(),
              tweetAddedToSystem: new Date().toISOString(),
              ...newTweet,
            },
            ...state.tweets,
          ],
        }));

        get().updateItemsToWriteToFile({ items: ["tweets"] });
      },
      updateTweet: (userTweet: TweetType) => {
        set((state) => ({
          tweets: [
            ...state.tweets.map((tweet) =>
              tweet.systemId === userTweet.systemId ? { ...userTweet } : tweet
            ),
          ],
        }));

        get().updateItemsToWriteToFile({ items: ["tweets"] });
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

        get().updateItemsToWriteToFile({ items: ["tweets"] });
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

        get().updateItemsToWriteToFile({ items: ["tweets"] });
      },
      setTweets: (tweets: TweetType[]) => {
        set({ tweets: [...tweets] });
      },
      itemsToWriteToFile: [] as UpdateItemsToWriteToFileType["items"],
      updateItemsToWriteToFile: ({ items }: UpdateItemsToWriteToFileType) => {
        set((state) => ({
          itemsToWriteToFile: Array.from(
            new Set([...state.itemsToWriteToFile, ...items])
          ),
        }));
      },
      clearItemsToWriteToFile: () => {
        set(() => ({
          itemsToWriteToFile: [],
        }));
      },
    }),
    {
      name: XK_STORE_KEY,
    }
  )
);

export const writeUpdatedStoreItemsToFile = ({
  store,
}: {
  store: TweetStore;
}) => {
  const items: UpdateItemsToWriteToFileType["items"] = [
    ...store.itemsToWriteToFile,
  ];

  if (items.length > 0 && shouldWriteToFile) {
    if (items.includes("tweets")) {
      writeFileAtKey({
        fileKey: XK_TWEETS_KEY,
        content: JSON.stringify([...store.tweets], null, 2),
      });
    }
  }

  store.clearItemsToWriteToFile();
};

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
