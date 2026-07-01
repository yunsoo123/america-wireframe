import Link from "next/link";
import { Compass } from "lucide-react";
import { SideNav } from "@/components/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <aside className="border-b border-line bg-card/70 backdrop-blur lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
        <Link href="/" className="hidden items-center gap-2.5 px-5 py-4 lg:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
            <Compass size={17} />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-ink">Northstar</span>
        </Link>
        <SideNav />
      </aside>
      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-8">{children}</main>
    </div>
  );
}
