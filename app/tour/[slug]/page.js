import Loading from "@/app/_components/Loading";
import TourPage from "@/app/_components/TourPage";
import { Suspense } from "react";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.SERVER_URL}api/v1/tours?fields=slug&limit=1000`,
  );
  if (!response.ok) throw new Error("Unable to load tours for prerendering");

  const data = await response.json();
  return data.data.data.map((tour) => ({ slug: tour.slug }));
}

async function Page({ params, searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <TourPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
