import { Fragment } from "react";
import { cn } from "@/utils";
import {
  EnrichedTweet,
  EnrichedQuotedTweet,
  getMediaUrl,
  type TwitterComponents,
} from "react-tweet";
import { MediaDetails } from "react-tweet/api";
import { TweetMediaVideo } from "./tweet-media-video";
import { MediaImg } from "./media-img";
import Link from "next/link";

const getSkeletonStyle = (media: MediaDetails, itemCount: number) => {
  let paddingBottom = 56.25; // default of 16x9

  // if we only have 1 item, show at original ratio
  if (itemCount === 1)
    paddingBottom =
      (100 / media.original_info.width) * media.original_info.height;

  // if we have 2 items, double the default to be 16x9 total
  if (itemCount === 2) paddingBottom = paddingBottom * 2;

  return {
    width: media.type === "photo" ? undefined : "unset",
    paddingBottom: `${paddingBottom}%`,
  };
};

type Props = {
  tweet: EnrichedTweet | EnrichedQuotedTweet;
  components?: TwitterComponents;
  quoted?: boolean;
};

export const TweetMedia = ({ tweet, components, quoted }: Props) => {
  const length = tweet.mediaDetails?.length ?? 0;
  const Img = components?.MediaImg ?? MediaImg;

  return (
    <div
      className={cn(
        "relative mt-3 overflow-hidden",
        !quoted && "rounded-xl border"
      )}
    >
      <div
        className={cn(
          "grid h-full w-full auto-rows-[1fr] gap-0.5",
          length > 1 && "grid-cols-[repeat(2,1fr)]",
          length > 4 && "grid-rows-[repeat(2,1fr)]"
        )}
      >
        {tweet.mediaDetails?.map((media) => (
          <Fragment key={media.media_url_https}>
            {media.type === "photo" ? (
              <Link
                key={media.media_url_https}
                href={getMediaUrl(media, "large")}
                className={cn(
                  "relative flex h-full w-full items-center justify-center",
                  "no-underline",
                  length === 3 && "first:row-[span_2]"
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="block w-full pb-[56.25%]"
                  style={getSkeletonStyle(media, length)}
                />
                <Img
                  src={getMediaUrl(media, "small")}
                  alt={media.ext_alt_text || "Image"}
                  className="absolute inset-y-0 left-0 m-0 h-full w-full object-cover object-center dark:brightness-75"
                />
              </Link>
            ) : (
              <div
                key={media.media_url_https}
                className={
                  "relative flex h-full w-full items-center justify-center"
                }
              >
                <div
                  className="block w-full pb-[56.25%]"
                  style={getSkeletonStyle(media, length)}
                />
                <TweetMediaVideo tweet={tweet} media={media} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
