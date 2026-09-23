"use client";

import Link from "next/link";
import { useState } from "react";

export default function HeaderMenu({ children, logo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link
        href="/"
        aria-label="Natours home"
        onClick={() => setIsOpen(false)}
        className="col-start-1 row-start-1 w-fit lg:col-start-2 lg:justify-self-center"
      >
        {logo}
      </Link>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-controls="header-navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="col-start-2 row-start-1 flex h-16 w-16 items-center justify-center rounded-md border border-white/40 text-white lg:hidden"
      >
        <svg
          className="h-8 w-8 fill-none stroke-current stroke-2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path d="M5 5 19 19M19 5 5 19" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      <div
        id="header-navigation"
        className={`${isOpen ? "flex" : "hidden"} col-span-2 row-start-2 flex-col gap-4 pt-10 lg:contents`}
      >
        <nav aria-label="Tours" className="lg:col-start-1 lg:row-start-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="inline-flex min-h-16 items-center text-[1.6rem] font-normal uppercase text-white transition-all duration-200 hover:[transform:translateY(-2px)] hover:text-shadow-[0_0.7rem_1rem_black] active:[transform:translateY(-2px)] active:text-shadow-[0_0.7rem_1rem_black]"
          >
            All tours
          </Link>
        </nav>
        <nav
          aria-label="Account"
          onClick={() => setIsOpen(false)}
          className="flex flex-col items-start gap-5 pb-4 text-white [&_a]:m-0! [&_a]:min-h-16 [&_button]:m-0! [&_button]:min-h-16 lg:col-start-3 lg:row-start-1 lg:flex-row lg:items-center lg:justify-end lg:gap-8 lg:pb-0"
        >
          {children}
        </nav>
      </div>
    </>
  );
}
