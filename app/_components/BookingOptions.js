"use client";

import { startTransition, useActionState, useState } from "react";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BookingOptions({ startDates, tourId, createCheckoutSession }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, submitCheckout, isPending] = useActionState(
    createCheckoutSession,
    { error: null },
  );

  return (
    <div className="row-span-full flex flex-col items-center gap-6">
      <button
        className={`leading-[normal] text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline relative ${isOpen ? "left-10" : "left-0"} transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]`}
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        Book tour now!
      </button>

      {isOpen && (
        <div className="ml-20 flex max-w-160 self-stretch flex-wrap justify-center gap-3 rounded-2xl bg-[#f7f7f7] p-4 shadow-[0_1rem_3rem_rgba(0,_0,_0,_0.15)]">
          {startDates.map((startDate) => (
            <div key={startDate._id ?? startDate.date}>
              <button
                className="min-w-36 cursor-pointer rounded-xl border border-[#d8d8d8] bg-white px-5 py-3 text-center text-[1.3rem] transition-all hover:-translate-y-0.5 hover:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.1)] disabled:cursor-not-allowed disabled:bg-[#eee] disabled:text-[#888] disabled:hover:translate-y-0 disabled:hover:shadow-none"
                disabled={startDate.soldOut || isPending}
                onClick={() =>
                  startTransition(() =>
                    submitCheckout({ tourId, bookedDate: startDate._id }),
                  )
                }
                type="button"
              >
                <strong className="block font-bold">
                  {formatDate(startDate.date)}
                </strong>
                <span className="mt-1 block">
                  {startDate.soldOut
                    ? "SOLD OUT"
                    : `${startDate.participants} participants`}
                </span>
              </button>
            </div>
          ))}
          {state.error && (
            <span className="basis-full text-center text-[1.4rem] text-[#eb4d4b]">
              {state.error}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingOptions;
