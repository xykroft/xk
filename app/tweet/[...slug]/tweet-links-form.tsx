"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTweetStore } from "@/app/store";
import { type TweetType } from "@/app/zdb";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/utils";
import { useEffect } from "react";

const githubLinkSchema = z
  .string()
  .url({ message: "Please enter a valid link." })
  .startsWith("https://github.com/", {
    message: 'Link must start with "https://github.com/".',
  })
  .or(z.literal(""));

const demoLinkSchema = z
  .string()
  .url({ message: "Please enter a valid link." })
  .or(z.literal(""));

const tweetLinksFormSchema = z.object({
  githubLink: githubLinkSchema,
  demoLink: demoLinkSchema,
});

type TweetLinksFormValues = z.infer<typeof tweetLinksFormSchema>;

export default function TweetLinksForm({ tweet }: { tweet: TweetType }) {
  const updateTweetProperty = useTweetStore(
    (state) => state.updateTweetProperty
  );

  const defaultValues: Partial<TweetLinksFormValues> = {
    githubLink: tweet?.githubLink ?? "",
    demoLink: tweet?.demoLink ?? "",
  };

  const form = useForm<TweetLinksFormValues>({
    resolver: zodResolver(tweetLinksFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    tweet?.githubLink && form.setValue("githubLink", tweet.githubLink);
    tweet?.demoLink && form.setValue("demoLink", tweet.demoLink);
    form.trigger();
  }, [form, tweet]);

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full flex-1 flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem className="group/tweet-github-link flex flex-col">
              <div className="flex items-center gap-0.5">
                <FormLabel
                  htmlFor="tweet-github-link"
                  className={cn(
                    "leading-4 text-neutral-500 dark:text-neutral-400",
                    tweet?.githubLink &&
                      githubLinkSchema.safeParse(tweet.githubLink).success &&
                      !form.getFieldState("githubLink").invalid &&
                      "text-neutral-700 dark:text-neutral-300"
                  )}
                >
                  Github Link
                </FormLabel>
                {tweet?.githubLink &&
                  githubLinkSchema.safeParse(tweet.githubLink).success &&
                  !form.getFieldState("githubLink").invalid && (
                    <Button
                      variant="ghost"
                      className="size-4 p-0 opacity-0 group-focus-within/tweet-github-link:opacity-100 group-hover/tweet-github-link:opacity-100"
                      asChild
                    >
                      <Link
                        href={tweet?.githubLink ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Github Repo"
                      >
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
              </div>
              <FormControl>
                <Input
                  id="tweet-github-link"
                  placeholder="Github Link"
                  spellCheck={false}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    form.trigger(field.name);
                    updateTweetProperty({
                      tweetSystemId: tweet.systemId,
                      propertyName: "githubLink",
                      newValue:
                        event.target.value === ""
                          ? undefined
                          : event.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="demoLink"
          render={({ field }) => (
            <FormItem className="group/tweet-demo-link flex flex-col">
              <div className="flex items-center gap-0.5">
                <FormLabel
                  htmlFor="tweet-demo-link"
                  className={cn(
                    "leading-4 text-neutral-500 dark:text-neutral-400",
                    tweet?.demoLink &&
                      demoLinkSchema.safeParse(tweet.demoLink).success &&
                      !form.getFieldState("demoLink").invalid &&
                      "text-neutral-700 dark:text-neutral-300"
                  )}
                >
                  Demo Link
                </FormLabel>
                {tweet?.demoLink &&
                  demoLinkSchema.safeParse(tweet.demoLink).success &&
                  !form.getFieldState("demoLink").invalid && (
                    <Button
                      variant="ghost"
                      className="size-4 p-0 opacity-0 group-focus-within/tweet-demo-link:opacity-100 group-hover/tweet-demo-link:opacity-100"
                      asChild
                    >
                      <Link
                        href={tweet?.demoLink ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Demo"
                      >
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
              </div>
              <FormControl>
                <Input
                  id="tweet-demo-link"
                  placeholder="Demo Link"
                  spellCheck={false}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    form.trigger(field.name);
                    updateTweetProperty({
                      tweetSystemId: tweet.systemId,
                      propertyName: "demoLink",
                      newValue:
                        event.target.value === ""
                          ? undefined
                          : event.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
