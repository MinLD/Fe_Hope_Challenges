import Banner from "@/app/components/banner";
import { Suspense } from "react";

function BannerSkeleton() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 animate-pulse" />
  );
}

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
    </div>
  );
}
