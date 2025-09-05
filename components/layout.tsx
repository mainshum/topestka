import { cn } from "@/utils/misc";

import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <main className={cn(outfit.variable, "max-sm:w-dvw lg:max-w-full")}>
        {children}
      </main>
  );
}
