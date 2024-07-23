// adapted from https://react-tweet.vercel.app/twitter-theme/api-reference;
// https://github.com/vercel/react-tweet/blob/main/apps/next-app/app/api/tweet/%5Bid%5D/route.ts

import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

type RouteSegment = { params: { id: string } };

export const fetchCache = "only-cache";

export async function GET(_req: Request, { params }: RouteSegment) {
  console.log(`tweet fetched from local api: ${params.id}`);
  try {
    const tweet = await getTweet(params.id);
    const formattedTweet = tweet
      ? {
          ...tweet,
          user: {
            ...tweet.user,
            profile_image_url_https: tweet.user.profile_image_url_https.replace(
              "_normal",
              "_400x400"
            ),
          },
        }
      : null;
    return NextResponse.json(
      { data: formattedTweet ?? null },
      { status: formattedTweet ? 200 : 404 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as { message: string })?.message ?? "Bad request." },
      { status: 400 }
    );
  }
}
