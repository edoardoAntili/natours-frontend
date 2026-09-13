import TourCard from "./TourCard";
import { getAllTours } from "../_utils/api";

async function TourCardContainer() {
  const tours = await getAllTours();

  return (
    <div className="max-w-480 grid grid-cols-[repeat(3,_1fr)] gap-28 my-0 mx-auto">
      {tours.map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  );
}

export default TourCardContainer;
