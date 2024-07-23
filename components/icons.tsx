import { cn } from "@/utils";

type IconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

type ShellIconProps = IconProps & {
  d: string;
};

// https://v1.heroicons.com/
const HeroIconShell = ({ d, className, ...props }: ShellIconProps) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      width="24px"
      height="24px"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6 stroke-2", className ?? "")}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
};

export const Icons = {
  sun: (props: IconProps) => (
    <HeroIconShell
      {...props}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  moon: (props: IconProps) => (
    <HeroIconShell
      {...props}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  ),
  spinner: ({ className, ...props }: IconProps) => (
    <svg
      aria-hidden="true"
      className={cn("h-5 w-5 animate-spin text-neutral-500", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ),
};
