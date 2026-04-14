import "./globals.css";

import type { Metadata } from "next";
// import CookieBanner from "@/components/CookieBanner";
// import { Inter } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["300", "400", "500", "600", "700"],
// });

// const sans = Open_Sans({ subsets: ["latin"] });

// import { cn } from "@/lib/utils";
import ToastContainer from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: "GiAgency Admin",
  description: "Admin page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={cn(inter.className, "")}> */}
      <body>
        {/* <Toaster /> */}
        {children}
        {/* <CookieBanner /> */}
        <ToastContainer />
      </body>
    </html>
  );
}
