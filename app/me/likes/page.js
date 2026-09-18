import { Suspense } from "react";
import AccountLoginNotice from "../../_components/AccountLoginNotice";
import Loading from "../../_components/Loading";
import TourCard from "../../_components/TourCard";
import AccountRouteError from "../../_components/AccountRouteError";
import { getLikedTours } from "../../_utils/api";

async function LikesContent() {
  const result = await getLikedTours();
  if (result.status === "unauthenticated") return <AccountLoginNotice />;
  if (result.status === "error")
    return <AccountRouteError resource="liked tours" />;
  const { tours } = result;

  return (
    <section className="px-6 sm:px-12 xl:px-20">
      <h1 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] mb-8">
        My likes
      </h1>
      {tours.length === 0 ? (
        <p className="text-[1.7rem]">You have not liked any tours yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-12 p-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {tours.map((tour, index) => (
            <TourCard tour={tour} key={tour._id} priority={index === 0} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function LikesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LikesContent />
    </Suspense>
  );
}
