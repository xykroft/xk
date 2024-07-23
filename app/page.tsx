import { MainNav } from "@/components/main-nav";
import { PageTweets } from "./page-tweets";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[2000px] px-4 pb-12 pt-1">
        <PageTweets />
      </div>
    </div>
  );
}
