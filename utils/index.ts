import axios, { AxiosError } from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WriteFileType } from "@/app/api/write-file/route";

// from https://github.com/shadcn/ui/blob/main/templates/next-template/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchTweetRequest(tweetId: string): Promise<object> {
  return axios.get(`/api/tweet/${tweetId}`); // send a GET request;
}

export async function fetchTweet(tweetId: string): Promise<object> {
  return axios
    .get(`/api/tweet/${tweetId}`) // send a GET request
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleAxiosError(error);
      return { type: "error", message: "tweet not found" };
    });
}

export async function writeFileAtKey({
  fileKey,
  content,
  shouldOverwrite,
}: WriteFileType) {
  return await axios
    .post(`/api/write-file`, { fileKey, content, shouldOverwrite })
    .then((response) => {
      // console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch((error) => {
      handleAxiosError(error);
    });
}

// https://stackoverflow.com/a/8511350 : check if value is object
const isObject = (value: unknown) => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};

export const handleAxiosError = (error: AxiosError) => {
  // https://stackoverflow.com/a/50616279 : handle axios errors
  if (error.response) {
    // status code out of the range of 2xx
    const errorData = isObject(error.response.data)
      ? {
          ...(error.response.data as object),
          status: error.response.status,
        }
      : error.response.data;
    console.error(`AxiosError: ${JSON.stringify(errorData, null, 2)}`);
  } else if (error.request) {
    // request was made but no response was received
    console.error(
      `AxiosError: ${JSON.stringify(
        {
          message: "request was made but no response was received",
          ...error.request,
        },
        null,
        2
      )}`
    );
  } else {
    // error on setting up the request
    console.error("AxiosError: error on setting up the request");
    console.error("Error", error.message);
  }

  return null;
};
