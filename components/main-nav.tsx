import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import {
  AddTweetButton,
  ClearLocalStorageTweetStoreButton,
} from "./nav-components";

export function MainNav() {
  return (
    <header className="w-full bg-white dark:bg-neutral-950">
      <div className="mx-auto flex h-16 w-full max-w-[2000px] items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="text-base font-medium text-neutral-950 dark:text-neutral-50"
        >
          @xykroft
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {process.env.NODE_ENV === "development" && <AddTweetButton />}
          {process.env.NODE_ENV === "development" && (
            <ClearLocalStorageTweetStoreButton />
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
