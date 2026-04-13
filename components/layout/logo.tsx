import { cn } from "@/lib/utils";
import Link from "next/link";

export const Logo = ({ width = "w-[100px]" }) => {
  return (
    <div className="">
      <Link href="/" className="inline-block">
        <img
          src="/logo.svg"
          alt="logo"
          className={cn("h-auto mb-[2px]", width)}
        />
      </Link>
      <p className="text-green-600 text-sm font-bold">Admin Portal</p>
    </div>
  );
};

export const LogoFooter = ({ width = "w-[200px]" }) => {
  return (
    <Link href="/" className="inline-block">
      <img src="/logowhite.png" alt="logo" className={cn("h-auto", width)} />
    </Link>
  );
};
// //logo with text only
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// type LogoSize = "sm" | "md" | "lg";

// interface LogoProps {
//   size?: LogoSize;
// }

// const sizeClasses: Record<LogoSize, string> = {
//   sm: "text-lg",
//   md: "text-2xl",
//   lg: "text-4xl",
// };

// export const Logo = ({ size = "md" }: LogoProps) => {
//   return (
//     <Link href="/" className="inline-block">
//       <h1
//         className={cn("text-2xl font-bold text-green-600", sizeClasses[size])}
//       >
//         FurnitureHub
//       </h1>
//     </Link>
//   );
// };
{
  /* <Logo />                 // default md
<Logo size="sm" />
<Logo size="lg" /> */
}

//with image
// import Link from "next/link";
// import clsx from "clsx";

// type LogoSize = "sm" | "md" | "lg";

// interface LogoImageProps {
//   size?: LogoSize;
// }

// const imageSizeClasses: Record<LogoSize, string> = {
//   sm: "w-24",
//   md: "w-32",
//   lg: "w-48",
// };

// export const LogoImage = ({ size = "md" }: LogoImageProps) => {
//   return (
//     <Link href="/" className="inline-block">
//       <img
//         src="/logo.png" // place your logo in /public/logo.png
//         alt="FurnitureHub logo"
//         className={clsx("h-auto object-contain", imageSizeClasses[size])}
//       />
//     </Link>
//   );
// };

{
  /* <LogoImage />            // md (default)
<LogoImage size="sm" />
<LogoImage size="lg" /> */
}

//logo and text
// import Link from "next/link";
// import clsx from "clsx";

// interface BrandLogoProps {
//   size?: LogoSize;
//   showText?: boolean;
// }

// const imageSizeClasses: Record<LogoSize, string> = {
//   sm: "w-24",
//   md: "w-32",
//   lg: "w-48",
// };

// export const BrandLogo = ({ size = "md", showText = true }: BrandLogoProps) => {
//   return (
//     <Link href="/" className="flex items-center gap-2">
//       <img
//         src="/logo-icon.png"
//         alt="FurnitureHub logo"
//         className={clsx("h-auto", imageSizeClasses[size])}
//       />
//       {showText && (
//         <span className="font-poppins font-bold text-green-600">
//           FurnitureHub
//         </span>
//       )}
//     </Link>
//   );
// };
