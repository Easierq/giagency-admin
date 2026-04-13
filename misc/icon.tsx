import type { ComponentProps, SVGProps } from "react";
type IconProps = React.HTMLAttributes<SVGElement>;

export function QuickAccessIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 8h16"></path>
        <path d="M4 16h16"></path>
      </g>
    </svg>
  );
}
