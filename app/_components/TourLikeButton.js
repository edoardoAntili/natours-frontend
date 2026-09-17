"use client";

import Link from "next/link";
import { useState } from "react";

function HeartIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      className="h-9 w-9"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function TourLikeButton({ tourId, initialLiked, isLoggedIn, setLikedTour }) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isPending, setIsPending] = useState(false);
  const className =
    "inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#55c57a] shadow-[0_0.4rem_1.5rem_rgba(0,_0,_0,_0.2)] transition-colors hover:bg-[#f0faf2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e864b]";

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        aria-label="Log in to like this tour"
        className={className}
      >
        <HeartIcon filled={false} />
      </Link>
    );
  }

  async function handleClick() {
    if (isPending) return;

    const nextLiked = !isLiked;
    setIsPending(true);

    try {
      if (await setLikedTour(tourId, nextLiked)) setIsLiked(nextLiked);
    } catch {
      return;
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={isLiked ? "Unlike this tour" : "Like this tour"}
      aria-pressed={isLiked}
      className={className}
    >
      <HeartIcon filled={isLiked} />
    </button>
  );
}

export default TourLikeButton;
