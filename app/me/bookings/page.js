import { Suspense } from "react";
import AccountLoginNotice from "../../_components/AccountLoginNotice";
import Loading from "../../_components/Loading";
import { getLoggedInUser } from "../../_utils/api";

async function BookingsContent() {
  const user = await getLoggedInUser();
  if (!user) return <AccountLoginNotice />;

  return (
    <section className="px-20">
      <h1 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] mb-8">
        My bookings
      </h1>
      <p className="text-[1.7rem]">Your bookings will appear here.</p>
    </section>
  );
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BookingsContent />
    </Suspense>
  );
}
