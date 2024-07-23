import { ReactTweetType, tweets } from "@/app/zdb";
import { handleAxiosError } from "@/utils";
import axios from "axios";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tweetId = params.slug.toString();

  try {
    const zdbTweet = tweets.find((tweet) => tweet.tweetId === tweetId);

    const fetchedTweet = zdbTweet
      ? zdbTweet
      : await axios
          .get(`https://react-tweet.vercel.app/api/tweet/${tweetId}`) // send a GET request
          .then((response) => {
            return response.data.data as ReactTweetType;
          })
          .catch((error) => {
            handleAxiosError(error);
            return { type: "error", message: "tweet not found" };
          });

    if (!zdbTweet) {
      console.log("\n\ntweet slug page fetch client tweet:\n", fetchedTweet);
    }

    const tweet = zdbTweet
      ? (zdbTweet.tweetJson as ReactTweetType)
      : fetchedTweet && "id_str" in fetchedTweet
        ? (fetchedTweet as ReactTweetType)
        : null;

    return tweet
      ? {
          title:
            `@${tweet?.user.screen_name}${tweet?.text ? `: "${tweet.text}"` : ""} | xykroft` ??
            "tweet | xykroft",
          description:
            `@${tweet?.user.screen_name}${tweet?.text ? `: "${tweet.text}"` : ""} | xykroft` ??
            "tweet | xykroft",
        }
      : {
          title: "404: This page could not be found.",
          description: "404: This page could not be found.",
        };
  } catch (e) {
    console.log(e);
    return {
      title: "404: This page could not be found.",
      description: "404: This page could not be found.",
    };
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
