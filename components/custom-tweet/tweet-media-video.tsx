"use client";

import { useState } from "react";
import type { MediaAnimatedGif, MediaVideo } from "react-tweet/api";
import {
  EnrichedQuotedTweet,
  type EnrichedTweet,
  getMediaUrl,
  getMp4Videos,
} from "react-tweet";

// adapted from https://github.com/vercel/react-tweet/blob/main/packages/react-tweet/src/utils.ts
export const getMp4Video = (media: MediaAnimatedGif | MediaVideo) => {
  const mp4Videos = getMp4Videos(media);
  // get the highest quality video
  return mp4Videos[0];
};

type Props = {
  tweet: EnrichedTweet | EnrichedQuotedTweet;
  media: MediaAnimatedGif | MediaVideo;
};

export const TweetMediaVideo = ({ media }: Props) => {
  const [playButton, setPlayButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const mp4Video = getMp4Video(media);
  let timeout = 0;

  return (
    <>
      <video
        className="absolute bottom-0 left-0 top-0 m-0 h-full w-full object-cover object-center dark:brightness-75"
        poster={getMediaUrl(media, "small")}
        controls={!playButton}
        muted
        // autoPlay
        // loop
        preload="metadata"
        tabIndex={playButton ? -1 : 0}
        onPlay={() => {
          if (timeout) window.clearTimeout(timeout);
          if (!isPlaying) setIsPlaying(true);
          if (ended) setEnded(false);
        }}
        onPause={() => {
          // When the video is seeked (moved to a different timestamp), it will pause for a moment
          // before resuming. We don't want to show the message in that case so we wait a bit.
          if (timeout) window.clearTimeout(timeout);
          timeout = window.setTimeout(() => {
            if (isPlaying) setIsPlaying(false);
            timeout = 0;
          }, 100);
        }}
        onEnded={() => {
          setEnded(true);
        }}
      >
        <source src={mp4Video.url} type={mp4Video.content_type} />
      </video>

      {playButton && (
        <button
          type="button"
          className="hover:bg-bg-neutral-950 focus-visible:bg-bg-neutral-950 relative flex h-[67px] w-[67px] cursor-pointer items-center justify-center rounded-full border-4 border-solid border-white bg-neutral-900 transition-[background-color] duration-200"
          aria-label="View video on Twitter"
          onClick={(e) => {
            const video = e.currentTarget.previousSibling as HTMLMediaElement;

            e.preventDefault();
            setPlayButton(false);
            setIsPlaying(true);
            video.play();
            video.focus();
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="ml-[3px] h-[calc(50%_+_4px)] w-[calc(50%_+_4px)] max-w-full select-none fill-current text-white"
            aria-hidden="true"
          >
            <g>
              <path d="M21 12L4 2v20l17-10z"></path>
            </g>
          </svg>
        </button>
      )}

      {/* {!isPlaying && !ended && (
        <div className="absolute right-2 top-3">
          <a
            href={tweet.url}
            className={cn(
              "flex cursor-pointer select-none items-center text-ellipsis whitespace-nowrap rounded-full border border-solid border-transparent px-4 py-0 font-bold text-[white] no-underline transition-[background-color] duration-200",
              "min-h-[2rem] min-w-[2rem] bg-[rgba(15,20,25,0.75)] text-sm leading-4 backdrop-blur-sm hover:bg-[rgba(39,44,48,0.75)]"
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            {playButton ? "Watch on Twitter" : "Continue watching on Twitter"}
          </a>
        </div>
      )} */}

      {/* {ended && (
        <a
          href={tweet.url}
          className={cn(
            "flex cursor-pointer select-none items-center text-ellipsis whitespace-nowrap rounded-full border border-solid border-transparent px-4 py-0 font-bold text-[white] no-underline transition-[background-color] duration-200",
            "relative min-h-[2rem] border-[color:var(--tweet-color-blue-primary)] bg-[color:var(--tweet-color-blue-primary)] text-[0.9375rem] leading-5 hover:bg-[color:var(--tweet-color-blue-primary-hover)]"
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          View replies
        </a>
      )} */}
    </>
  );
};
