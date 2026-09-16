import Loading from "@/app/_components/Loading";
import TourPage from "@/app/_components/TourPage";
import { Suspense } from "react";

async function Page({ params, searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <TourPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
