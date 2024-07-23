import { TwitterComponents, type EnrichedTweet } from "react-tweet";
import { cn } from "@/utils";
import { VerifiedBadge } from "./verified-badge";
import { AvatarImg } from "./avatar-img";
import { ExternalLinkIcon, EyeIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  tweet: EnrichedTweet;
  components?: TwitterComponents;
  shouldShowCustomElements?: boolean;
  githubLink?: string;
  demoLink?: string;
};

export const TweetHeader = ({
  tweet,
  components,
  shouldShowCustomElements = true,
  githubLink,
  demoLink,
}: Props) => {
  const Img = components?.AvatarImg ?? AvatarImg;
  const { user } = tweet;

  return (
    <div className="flex justify-between overflow-hidden whitespace-nowrap break-words pb-3">
      <div className="flex w-full">
        <Link
          className="relative left-px top-px flex gap-2"
          href={user.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative h-12 w-12">
            <div
              className={cn(
                "absolute bottom-px left-px right-px top-px h-[46px] w-[46px] overflow-hidden rounded-full",
                user.profile_image_shape === "Square" && "rounded"
              )}
            >
              <Img
                src={user.profile_image_url_https}
                alt={user.name}
                width={46}
                height={46}
              />
            </div>
            <div className="absolute bottom-px left-px right-px top-px h-[46px] w-[46px] overflow-hidden rounded-full">
              <div className="h-full w-full shadow-sm"></div>
            </div>
          </div>
          <div className="mx-0 flex flex-col justify-center">
            <div className="flex items-center text-inherit no-underline hover:underline">
              <div className="overflow-hidden whitespace-nowrap break-words font-medium">
                <span title={user.name}>{user.name}</span>
              </div>
              <VerifiedBadge user={user} className="inline-flex" />
            </div>
            <div className="flex">
              <div className="text-ellipsis text-sm text-neutral-600 no-underline dark:text-neutral-400">
                <span title={`@${user.screen_name}`}>@{user.screen_name}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {shouldShowCustomElements && (
          <React.Fragment>
            {process.env.NODE_ENV === "development" && (
              <Link
                className="hidden group-focus-within/tweet:block group-hover/tweet:block"
                href={`/tweet/${tweet.id_str}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Tweet"
              >
                <EyeIcon className="text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400" />
              </Link>
            )}
            {demoLink?.length && (
              <Link
                className="hidden group-focus-within/tweet:block group-hover/tweet:block"
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Demo"
              >
                <ExternalLinkIcon className="text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400" />
              </Link>
            )}
            {githubLink?.length && (
              <Link
                className="hidden group-focus-within/tweet:block group-hover/tweet:block"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Github Repo"
              >
                <GithubIcon className="text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400" />
              </Link>
            )}
          </React.Fragment>
        )}
        <Link
          href={tweet.url}
          className="relative right-px"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on Twitter"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[23.75px] w-[23.75px] select-none fill-current"
          >
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  );
};
