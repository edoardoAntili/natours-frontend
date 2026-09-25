import TourPage from "@/app/_components/TourPage";
import { getTourBySlug } from "@/app/_utils/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getTourBySlug(slug);
  if (result.status !== "success") {
    return { title: "Tour unavailable" };
  }

  const { tour } = result;
  return {
    title: tour.name,
    description:
      tour.summary || tour.description || `Explore ${tour.name} with Natours.`,
  };
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.SERVER_URL}api/v1/tours?fields=slug&limit=1000`,
  );
  if (!response.ok) throw new Error("Unable to load tours for prerendering");

  const data = await response.json();
  return data.data.data.map((tour) => ({ slug: tour.slug }));
}

function Page({ params, searchParams }) {
  return <TourPage params={params} searchParams={searchParams} />;
}

export default Page;
