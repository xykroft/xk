import { cn } from "@/utils";
import { Verified, VerifiedBusiness, VerifiedGovernment } from "./icons";
import { TweetUser } from "react-tweet/api";

type Props = {
  user: TweetUser;
  className?: string;
};

export const VerifiedBadge = ({ user, className }: Props) => {
  const verified = user.verified || user.is_blue_verified || user.verified_type;
  let icon = <Verified />;

  if (verified) {
    if (!user.is_blue_verified) {
    }
    switch (user.verified_type) {
      case "Government":
        icon = <VerifiedGovernment />;
        break;
      case "Business":
        icon = <VerifiedBusiness />;
        break;
    }
  }

  return verified ? <div className={cn(className)}>{icon}</div> : null;
};
