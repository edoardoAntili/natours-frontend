import { Suspense } from "react";
import TourCardContainer from "./_components/TourCardContainer";
import Loading from "./_components/Loading";

export default function Overview() {
  return (
    <main className="bg-[#f7f7f7] flex-1 relative py-12 px-6 sm:py-20 sm:px-12 lg:py-32 lg:px-24">
      <Suspense fallback={<Loading />}>
        <TourCardContainer />
      </Suspense>
    </main>
  );
}
