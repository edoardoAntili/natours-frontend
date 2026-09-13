import TourCard from "./TourCard";
import { getAllTours } from "../_utils/api";

async function TourCardContainer() {
  const tours = await getAllTours();

  return (
    <div className="card-container">
      {tours.map((tour) => (
        <TourCard tour={tour} key={tour.id} />
      ))}
    </div>
  );
}

export default TourCardContainer;
