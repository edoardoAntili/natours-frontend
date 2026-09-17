"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function ActiveAccountLink({ href, text, icon, segment }) {
  const active = useSelectedLayoutSegment() === segment;

  return (
    <li
      className={
        active
          ? "[border-left:4px_solid_#fff]! [&_a]:[transform:translateX(-3px)]"
          : ""
      }
    >
      <Link href={href} aria-current={active ? "page" : undefined}>
        <svg>
          <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
        </svg>

        {text}
      </Link>
    </li>
  );
}
