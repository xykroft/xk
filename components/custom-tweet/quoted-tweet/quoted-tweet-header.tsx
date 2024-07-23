import { cn } from "@/utils";
import { AvatarImg } from "../avatar-img";
import { type EnrichedQuotedTweet } from "react-tweet";
import { VerifiedBadge } from "../verified-badge";

type Props = { tweet: EnrichedQuotedTweet };

export const QuotedTweetHeader = ({ tweet }: Props) => {
  const { user } = tweet;

  return (
    <div className="flex overflow-hidden whitespace-nowrap break-words px-3 pb-0 pt-3 text-[length:0.9375rem] leading-5">
      <div className="relative flex h-5 w-5 shrink-0">
        <div
          className={cn(
            "absolute h-full w-full overflow-hidden rounded-full",
            user.profile_image_shape === "Square" && "rounded"
          )}
        >
          <AvatarImg
            src={user.profile_image_url_https}
            alt={user.name}
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="mx-2 my-0 flex">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          <span title={user.name}>{user.name}</span>
        </div>
        <VerifiedBadge user={user} />
        <div className="ml-0.5 text-ellipsis text-neutral-600 no-underline dark:text-neutral-400">
          <span title={`@${user.screen_name}`}>@{user.screen_name}</span>
        </div>
      </div>
    </div>
  );
};
