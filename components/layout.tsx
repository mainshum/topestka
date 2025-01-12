import { cn } from '@/utils/misc';
import Nav from './Nav'

import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav className={outfit.variable} />
      <main className={cn(outfit.variable, "w-full")}>
        {children}
      </main>
    </>
  )
}
