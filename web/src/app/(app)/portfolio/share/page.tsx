import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader, Disclaimer } from "@/components/ui";
import { ShareCard } from "@/components/features";

export default function PortfolioSharePage() {
  return (
    <div>
      <Link href="/portfolio" className="mb-4 flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
        <ArrowLeft size={16} /> 포트폴리오 닥터
      </Link>

      <PageHeader
        title="진단 카드 공유"
        desc="개인정보를 가린 상태로 건강점수·주의 포인트만 공유합니다."
      />

      <ShareCard />

      <Disclaimer />
    </div>
  );
}
