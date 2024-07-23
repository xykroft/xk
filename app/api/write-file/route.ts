import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { XK_TWEETS_KEY } from "@/app/constants";

export async function POST(request: NextRequest) {
  try {
    // https://codedamn.com/news/javascript/zod-getting-started : parse w/ zod
    const rawData = await request.json();
    const parsedData = await WriteFileSchema.safeParseAsync(rawData);

    if (parsedData.success) {
      const { fileKey, content, shouldOverwrite } = parsedData.data;

      const writeMessage = writeFile({ fileKey, content, shouldOverwrite });

      return NextResponse.json({ message: writeMessage }, { status: 200 });
    } else {
      const invalidArgMap = parsedData?.error.errors.map(
        (error) => `\`${error.path}\``
      );
      const errorMessage = `ERROR in calling api function 'write-file'${
        invalidArgMap
          ? `! The following argument${
              invalidArgMap.length > 1 ? "s are" : " is"
            } invalid: ${invalidArgMap.join(", ")}.`
          : ": invalid argument(s)!"
      }`;
      console.error(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error running script" },
      { status: 500 }
    );
  }
}

const fileKeys: {
  [key in typeof XK_TWEETS_KEY]: { path: string; contentPrefix: string };
} = {
  "xk-tweets": {
    path: `app/zdb/data/tweets.ts`,
    contentPrefix: `import { type TweetType } from "../types";\n\nexport const tweets: TweetType[] = `,
  },
} as const;

// from https://github.com/colinhacks/zod/discussions/839#discussioncomment-8142768
/** Converts a plain object's keys into ZodEnum with type safety and autocompletion */
function getZodEnumFromObjectKeys<
  TI extends Record<string, unknown>,
  R extends string = TI extends Record<infer R, unknown> ? R : never,
>(input: TI): z.ZodEnum<[R, ...R[]]> {
  const [firstKey, ...otherKeys] = Object.keys(input) as [R, ...R[]];
  return z.enum([firstKey, ...otherKeys]);
}

const fileKeyZodEnum = getZodEnumFromObjectKeys(fileKeys);

const WriteFileSchema = z.object({
  fileKey: fileKeyZodEnum,
  content: z.string(),
  shouldOverwrite: z.boolean().optional(),
});

export type WriteFileType = z.infer<typeof WriteFileSchema>;

function writeFile({
  fileKey,
  content,
  shouldOverwrite = true,
}: WriteFileType) {
  const filePath = fileKeys[fileKey].path;
  const contentPrefix = fileKeys[fileKey]?.contentPrefix;

  const resolvedPath = path.resolve(filePath);
  const dirName = path.dirname(resolvedPath);

  const newContent = `${contentPrefix ? contentPrefix : ""}${content}${"\n"}`;

  // if the directory does not exist, create the directory
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  if (fs.existsSync(resolvedPath)) {
    // if the file exists, only overwrite if `shouldOverwrite`
    if (shouldOverwrite) {
      fs.writeFileSync(resolvedPath, newContent);
      console.log(`File overwritten: \`${resolvedPath}\`\n\n`);
      return `File overwritten: \`${resolvedPath}\`\n\n`;
    } else {
      console.log(`File ignored: \`${resolvedPath}\`\n\n`);
      return `File ignored: \`${resolvedPath}\`\n\n`;
    }
  } else {
    // if the file does not exist, create the file
    fs.writeFileSync(resolvedPath, newContent);
    console.log(`File created: \`${resolvedPath}\`\n\n`);
    return `File created: \`${resolvedPath}\`\n\n`;
  }
}
