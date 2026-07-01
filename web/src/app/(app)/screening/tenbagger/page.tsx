import { getCandidates } from "@/lib/screener";
import { TenbaggerClient } from "@/components/TenbaggerClient";

export const revalidate = 900;

export default async function TenbaggerPage() {
  const { candidates, live } = await getCandidates();
  return <TenbaggerClient candidates={candidates} live={live} />;
}
