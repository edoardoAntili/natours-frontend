import TourCard from "./TourCard";
import ServiceUnavailable from "./ServiceUnavailable";
import { cacheLife, cacheTag } from "next/cache";

async function TourCardContainer() {
  "use cache";
  cacheTag("tours");
  let tours;
  try {
    const response = await fetch(`${process.env.SERVER_URL}api/v1/tours`);
    if (!response.ok) throw new Error("Unable to load tours");
    const data = await response.json();
    if (data.status !== "success" || !Array.isArray(data.data?.data))
      throw new Error("Invalid tours response");
    tours = data.data.data;
  } catch {
    cacheLife({ stale: 30, revalidate: 1, expire: 300 });
    return <ServiceUnavailable />;
  }
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  return (
    <div className="max-w-[120rem] grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 xl:gap-20 my-0 mx-auto">
      {tours.map((tour, index) => (
        <TourCard tour={tour} key={tour.id} priority={index === 0} />
      ))}
    </div>
  );
}

export default TourCardContainer;
