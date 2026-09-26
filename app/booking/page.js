import Link from "next/link";
import { Suspense } from "react";
import { getTourBySlug } from "../_utils/api";

export const metadata = { title: "Booking" };

function BookingCard({ children }) {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f7f7f7] px-6 py-20">
      <section
        className="flex w-full max-w-2xl flex-col items-center gap-8 rounded-2xl bg-white px-8 py-16 text-center text-[1.6rem] shadow-xl"
        aria-live="polite"
      >
        {children}
      </section>
    </main>
  );
}

async function BookingResult({ searchParams }) {
  const { status, tour } = await searchParams;
  if (status === "cancelled") {
    const candidate =
      typeof tour === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tour)
        ? tour
        : null;
    const slug =
      candidate && (await getTourBySlug(candidate)).status === "success"
        ? candidate
        : null;
    return (
      <BookingCard>
        <h1 className="text-4xl font-bold text-gray-800">Booking cancelled</h1>
        <p>No booking was made. You can try again when ready.</p>
        <Link
          className="inline-block rounded-full bg-[#55c57a] px-8 py-4 font-bold text-white"
          href={slug ? `/tour/${slug}` : "/"}
        >
          {slug ? "Back to tour" : "Explore tours"}
        </Link>
      </BookingCard>
    );
  }
  if (status === "success")
    return (
      <BookingCard>
        <h1 className="text-4xl font-bold text-[#2f8f45]">
          Payment successful
        </h1>
        <p>Thanks for booking. Your booking may take a moment to appear.</p>
        <Link
          className="inline-block rounded-full bg-[#55c57a] px-8 py-4 font-bold text-white"
          href="/me/bookings"
        >
          My bookings
        </Link>
      </BookingCard>
    );
  return (
    <BookingCard>
      <h1 className="text-4xl font-bold text-gray-800">No checkout found</h1>
      <p>Open a tour to start a booking.</p>
      <Link href="/">Explore tours</Link>
    </BookingCard>
  );
}

export default function BookingPage({ searchParams }) {
  return (
    <Suspense
      fallback={
        <BookingCard>
          <h1 className="text-4xl font-bold text-gray-800">Loading booking</h1>
        </BookingCard>
      }
    >
      <BookingResult searchParams={searchParams} />
    </Suspense>
  );
}
