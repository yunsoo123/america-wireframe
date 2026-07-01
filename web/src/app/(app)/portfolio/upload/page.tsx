import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader, Chip, Disclaimer } from "@/components/ui";
import { UploadForm } from "@/components/features";

export default function PortfolioUploadPage() {
  return (
    <div>
      <Link href="/portfolio" className="mb-4 flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
        <ArrowLeft size={16} /> 포트폴리오 닥터
      </Link>

      <PageHeader
        title="포트폴리오 연동 / 업로드"
        desc="브로커 연동 또는 CSV 업로드로 보유 종목을 등록합니다."
      />

      <div className="mb-5 flex gap-1.5">
        <Chip active>CSV 업로드</Chip>
        <Chip>브로커 연동 (프리미엄)</Chip>
      </div>

      <UploadForm />

      <p className="mt-4 text-xs text-black/50 dark:text-white/50">
        업로드 데이터는 암호화되어 저장되며 언제든 연동을 해제할 수 있습니다. 읽기 전용으로만 사용됩니다.
      </p>

      <Disclaimer />
    </div>
  );
}
