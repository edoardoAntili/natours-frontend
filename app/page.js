import { Suspense } from "react";
import TourCardContainer from "./_components/TourCardContainer";
import Loading from "./_components/Loading";

export default function Overview() {
  return (
    <main className="main">
      <Suspense fallback={<Loading />}>
        <TourCardContainer />
      </Suspense>
    </main>
  );
}
