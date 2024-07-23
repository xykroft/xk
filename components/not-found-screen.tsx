export const NotFoundScreen = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-screen items-center justify-center bg-white dark:bg-neutral-950">
      <div>
        <h2 className="inline-block align-top text-[24px] font-medium leading-[50px]">
          404
        </h2>
        <p className="ml-5 inline-block border-l border-l-neutral-300 pl-5 align-middle text-sm font-normal leading-[50px] dark:border-l-neutral-700">
          This page could not be found.
        </p>
      </div>
    </div>
  );
};
