"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export default function ActiveAccountLink({ href, text, icon, segment }) {
  const active = useSelectedLayoutSegment() === segment;
  const pathname = usePathname();
  const isActive = segment === "admin" ? pathname === href : active;

  return (
    <li
      className={
        isActive
          ? "[border-left:4px_solid_#fff]! [&_a]:[transform:translateX(-3px)]"
          : ""
      }
    >
      <Link href={href} aria-current={isActive ? "page" : undefined}>
        <svg>
          <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
        </svg>

        {text}
      </Link>
    </li>
  );
}
