import Image from "next/image";
import { Suspense } from "react";
import HeaderMenu from "./HeaderMenu";
import UserNav from "./UserNav";

function Header() {
  return (
    <header className="relative z-100 grid grid-cols-[1fr_auto] items-center bg-[#444] px-6 py-5 sm:px-12 lg:h-32 lg:grid-cols-[1fr_auto_1fr] lg:px-20 lg:py-0">
      <HeaderMenu logo={<Image className="h-14 w-auto" src="/img/logo-white.png" alt="Natours logo" width={0} height={0} sizes="100vw" loading="eager" />}>
        <Suspense fallback={<span className="h-16 w-48 animate-pulse rounded bg-white/10" aria-label="Loading account" />}>
          <UserNav />
        </Suspense>
      </HeaderMenu>
    </header>
  );
}

export default Header;
