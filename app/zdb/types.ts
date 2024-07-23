import { type Tweet } from "react-tweet/api";
import { type TweetParent } from "react-tweet/api";

export type ReactTweetType = Omit<Tweet, "mediaDetails"> & {
  mediaDetails?: unknown;
};

export type TweetType = {
  systemId: string;
  tweetAddedToSystem: string;
  tweetUrl: string;
  tweetId: string;
  tweetText: string;
  tweetCreatedAt: string;
  tweetAuthorId: string;
  tweetAuthorHandle: string;
  githubLink?: string;
  demoLink?: string;
  isReplyTweet?: boolean;
  isQuoteTweet?: boolean;
  isRetweet?: boolean;
  tweetJson: Omit<
    ReactTweetType,
    "edit_control" | "mediaDetails" | "parent" | "photos" | "quoted_tweet"
  > & {
    edit_control?: unknown;
    mediaDetails?: unknown;
    card?: unknown;
    photos?: unknown;
    video?: unknown;
    parent?: TweetParent & {
      in_reply_to_screen_name?: string;
      in_reply_to_status_id_str?: string;
      in_reply_to_user_id_str?: string;
      possibly_sensitive?: boolean;
      mediaDetails?: unknown;
      card?: unknown;
      photos?: unknown;
      video?: unknown;
    };
    quoted_tweet?: unknown;
    note_tweet?: unknown;
    previous_counts?: unknown;
  };
};

export type AddTweetType = Omit<TweetType, "systemId" | "tweetAddedToSystem">;
