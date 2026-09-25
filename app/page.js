import TourCardContainer from "./_components/TourCardContainer";

export const metadata = {
  title: "Explore tours",
  description: "Find your next adventure with Natours guided tours.",
};

export default function Overview() {
  return (
    <main className="bg-[#f7f7f7] flex-1 relative py-12 px-6 sm:py-20 sm:px-12 lg:py-32 lg:px-24">
      <TourCardContainer />
    </main>
  );
}
