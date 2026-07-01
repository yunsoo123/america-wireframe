"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Filter,
  Zap,
  Star,
  Stethoscope,
  Newspaper,
  CalendarDays,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
}

const NAV: NavItem[] = [
  { href: "/", label: "홈", icon: Home },
  { href: "/screening", label: "스크리닝", icon: Filter, highlight: true },
  { href: "/screening/tenbagger", label: "텐배거 스카우터", icon: Zap, highlight: true },
  { href: "/watchlist", label: "워치리스트", icon: Star },
  { href: "/portfolio", label: "포트폴리오 닥터", icon: Stethoscope },
  { href: "/news", label: "뉴스·이벤트", icon: Newspaper },
  { href: "/calendar", label: "경제 캘린더", icon: CalendarDays },
  { href: "/search", label: "검색", icon: Search },
  { href: "/settings", label: "설정", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SideNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible lg:p-3">
      {NAV.map(({ href, label, icon: Icon, highlight }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={
              "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors " +
              (active
                ? "bg-blue-600/10 font-medium text-blue-700 dark:text-blue-300"
                : "text-black/70 hover:bg-black/[0.04] dark:text-white/70 dark:hover:bg-white/5")
            }
          >
            <Icon size={18} className={highlight && !active ? "text-blue-600 dark:text-blue-400" : ""} />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
