import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./Loading";
import UserNav from "./UserNav";

async function Header() {
  return (
    <header className="bg-[#444] h-32 relative z-100 flex justify-between items-center py-0 px-20 [@media(max-width:62.5em)]:flex-col">
      <nav className="flex items-center flex-[0_1_40%] [@media(max-width:62.5em)]:mb-6 [@media(max-width:37.5em)]:flex-col [@media(max-width:37.5em)]:mb-0!">
        <Link
          href="/"
          className="text-[#f7f7f7] uppercase text-[1.6rem] no-underline inline-flex items-center transition-all ease-[ease] duration-200 font-normal bg-transparent border-0 cursor-pointer [font-family:inherit] hover:[transform:translateY(-2px)] hover:text-shadow-[0_0.7rem_1rem_black] active:[transform:translateY(-2px)] active:text-shadow-[0_0.7rem_1rem_black] not-last:mr-12 focus:outline-none [@media(max-width:37.5em)]:not-last:mr-0 [@media(max-width:37.5em)]:not-last:mb-[1.2rem]"
        >
          All tours
        </Link>
      </nav>

      <div className="[&_img]:h-14 [@media(max-width:62.5em)]:-order-1 [@media(max-width:62.5em)]:mb-6">
        <Image
          className="inline w-auto h-14"
          src="/img/logo-white.png"
          alt="Natours logo"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>

      <nav className="flex items-center flex-[0_1_40%] justify-end [@media(max-width:37.5em)]:flex-col">
        <Suspense fallback={<Loading />}>
          <UserNav />
        </Suspense>
      </nav>
    </header>
  );
}

export default Header;
