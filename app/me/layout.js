import { Suspense } from "react";
import AccountNav from "../_components/AccountNav";
import { getLoggedInUser } from "../_utils/api";

function SkeletonBlock({ className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded bg-white/20 ${className}`}>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent motion-safe:animate-[account-nav-shimmer_1.5s_ease-in-out_infinite]" />
    </div>
  );
}

function AccountNavFallback() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 lg:basis-[26rem] xl:basis-[32rem] [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] grid grid-cols-2 py-4 lg:block lg:py-16"
    >
      {["w-30", "w-40", "w-38", "w-28"].map((width, index) => (
        <div key={index} className="flex items-center gap-4 px-8 py-4 my-4 lg:px-12">
          <SkeletonBlock className="h-8 w-8 shrink-0" />
          <SkeletonBlock className={`h-5 ${width}`} />
        </div>
      ))}
    </div>
  );
}

async function AccountNavigation() {
  const user = await getLoggedInUser();
  return user ? <AccountNav role={user.role} /> : null;
}

function AccountLayout({ children }) {
  return (
    <main className="bg-[#f7f7f7] flex-1 relative py-12 px-6 sm:py-20 sm:px-12 lg:py-32 lg:px-24">
      <div className="bg-white max-w-480 min-h-screen rounded-[3px] overflow-hidden shadow-[0_2.5rem_8rem_2rem_rgba(0,_0,_0,_0.07)] flex flex-col lg:flex-row my-0 mx-auto">
        <Suspense fallback={<AccountNavFallback />}>
          <AccountNavigation />
        </Suspense>
        <div className="min-w-0 flex-1 py-12 px-0 sm:py-20 lg:py-28">
          {children}
        </div>
      </div>
    </main>
  );
}

export default AccountLayout;
