import Link from "next/link";
import { Zap } from "lucide-react";
import { SideNav } from "@/components/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <aside className="border-b border-black/10 bg-white/60 backdrop-blur lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r dark:border-white/10 dark:bg-neutral-950/60">
        <Link
          href="/"
          className="hidden items-center gap-2 px-5 py-4 text-sm font-medium lg:flex"
        >
          <Zap size={18} className="text-blue-600 dark:text-blue-400" />
          AI 투자 비서
        </Link>
        <SideNav />
      </aside>
      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-8">{children}</main>
    </div>
  );
}
