"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchTweetRequest, handleAxiosError } from "@/utils";
import { useTweetStore } from "./store";
import { type ReactTweetType } from "./zdb";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ToastDismissButton } from "@/components/ui/sonner";

/* don't make tweetRegex a global var b/c it needs to be recreated for each use */

// https://regex101.com/r/mNsp3o/4
// https://stackoverflow.com/a/49753932 : twitter regex tweetPattern
const tweetPattern =
  /^https?:\/\/(twitter|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/g;
const tweetIdRegexIndex = 4;

const getTweetIdFromTweetLink = (tweetLink: string) => {
  const tweetRegex = new RegExp(tweetPattern, "g");
  const isValidTweetLink = tweetRegex.test(tweetLink.toString());

  if (isValidTweetLink) {
    // recreate tweetRegex b/c it is returns undefined if used multiple times
    const tweetRegex = new RegExp(tweetPattern, "g");
    const tweetId = tweetRegex
      .exec(tweetLink.toString())
      ?.at(tweetIdRegexIndex);

    return tweetId;
  }

  return null;
};

const addTweetFormSchema = z.object({
  link: z.string().regex(tweetPattern, "Please enter a valid twitter link."),
});

type AddTweetFormValues = z.infer<typeof addTweetFormSchema>;

const defaultValues: Partial<AddTweetFormValues> = {
  link: "",
};

export const AddTweetForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const [existingTweetLink, setExistingTweetLink] = useState<
    string | undefined
  >(undefined);
  const addTweet = useTweetStore((state) => state.addTweet);
  const tweets = useTweetStore((state) => state.tweets);

  const form = useForm<AddTweetFormValues>({
    resolver: zodResolver(addTweetFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: AddTweetFormValues) {
    if (!existingTweetLink) {
      closeDialog();

      const tweetId = getTweetIdFromTweetLink(data.link);

      const tweet = tweetId
        ? tweets.find((tweet) => tweet.tweetId === tweetId)
        : null;

      if (!tweet && tweetId) {
        const toastId = toast.promise(
          fetchTweetRequest(tweetId) as Promise<{
            data: { data: ReactTweetType };
          }>,
          {
            loading: "Loading...",
            success: (response: { data: { data: ReactTweetType } }) => {
              const fetchedMetadata = response?.data?.data;

              addTweet({
                tweetUrl: data.link,
                tweetId: fetchedMetadata.id_str,
                tweetText: fetchedMetadata.text,
                tweetCreatedAt: fetchedMetadata.created_at,
                tweetAuthorId: fetchedMetadata.user.id_str,
                tweetAuthorHandle: fetchedMetadata.user.screen_name,
                githubLink: undefined,
                demoLink: undefined,
                tweetJson: fetchedMetadata,
              });
              return `@${fetchedMetadata.user.screen_name} tweet has been added`;
            },
            error: (error) => {
              handleAxiosError(error);
              return "Could not add tweet! Check console for errors.";
            },
            action: (
              <ToastDismissButton
                className="right-0.5 top-0.5"
                onClick={() => toast.dismiss(toastId)}
              />
            ),
          }
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2.5"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Paste a tweet link"
                  {...field}
                  onChange={(e) => {
                    const tweetRegex = new RegExp(tweetPattern, "g");
                    const isValidTweetLink = tweetRegex.test(
                      e.target.value?.toString()
                    );

                    if (isValidTweetLink) {
                      const tweetLink = e.target.value;
                      const tweetId = getTweetIdFromTweetLink(tweetLink);

                      const tweet = tweetId
                        ? tweets.find((tweet) => tweet.tweetId === tweetId)
                        : null;

                      if (tweet) {
                        setExistingTweetLink(tweetLink);
                      } else {
                        existingTweetLink !== undefined &&
                          setExistingTweetLink(undefined);
                      }
                    } else {
                      if (existingTweetLink) {
                        setExistingTweetLink(undefined);
                      }
                    }

                    return field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
              {existingTweetLink && (
                <p className="text-sm font-medium text-red-500 dark:text-red-900">
                  Tweet is already in system.
                </p>
              )}
            </FormItem>
          )}
        />
        {existingTweetLink ? (
          <Button type="button" className="w-full" asChild>
            <Link
              href={`/tweet/${getTweetIdFromTweetLink(existingTweetLink) ?? ""}`}
              target="_blank"
            >
              Open Tweet
            </Link>
          </Button>
        ) : (
          <Button
            disabled={!form.formState.isValid}
            className="w-full"
            type="submit"
          >
            Add Tweet
          </Button>
        )}
      </form>
    </Form>
  );
};
