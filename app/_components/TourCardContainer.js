import TourCard from "./TourCard";
import { getAllTours } from "../_utils/api";
import ServiceUnavailable from "./ServiceUnavailable";

async function TourCardContainer() {
  const result = await getAllTours();
  if (result.status === "error") return <ServiceUnavailable />;
  const { tours } = result;

  return (
    <div className="max-w-480 grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-20 my-0 mx-auto">
      {tours.map((tour, index) => (
        <TourCard tour={tour} key={tour.id} priority={index === 0} />
      ))}
    </div>
  );
}

export default TourCardContainer;
