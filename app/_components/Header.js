import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./Loading";
import UserNav from "./UserNav";

async function Header() {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link href="/" className="nav__el">
          All tours
        </Link>
      </nav>

      <div className="header__logo">
        <Image
          src="/img/logo-white.png"
          alt="Natours logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "auto",
            height: "3.5rem",
          }}
        />
      </div>

      <nav className="nav nav--user">
        <Suspense fallback={<Loading />}>
          <UserNav />
        </Suspense>
      </nav>
    </header>
  );
}

export default Header;
