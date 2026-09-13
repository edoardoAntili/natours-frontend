import Loading from "@/app/_components/Loading";
import TourPage from "@/app/_components/TourPage";
import { Suspense } from "react";

async function Page({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <TourPage params={params} />
    </Suspense>
  );
}

export default Page;
