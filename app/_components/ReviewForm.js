"use client";

import { useState } from "react";

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const displayedRating = hoveredRating || rating;
  const wordCount = review.trim() ? review.trim().split(/\s+/).length : 0;

  return (
    <section className="bg-[#f7f7f7] px-12 py-24">
      <div className="max-w-220 bg-white rounded-[1rem] shadow-[0_1rem_4rem_rgba(0,_0,_0,_0.12)] my-0 mx-auto p-12">
        <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] mb-8">
          Share your experience
        </h2>
        <form
          className="grid gap-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="text-[1.5rem] font-bold uppercase">
            Review
            <textarea
              name="review"
              required
              placeholder="Tell other travelers about your tour"
              value={review}
              onChange={(event) => {
                const nextReview = event.target.value;
                if (nextReview.trim().split(/\s+/).filter(Boolean).length <= 500)
                  setReview(nextReview);
              }}
              className="block w-full min-h-36 border border-[#ddd] rounded-[3px] text-[1.6rem] font-normal resize-y mt-2 p-4"
            />
            <span className="block text-[1.3rem] mt-2">{wordCount} / 500 words</span>
          </label>
          <fieldset className="border-0 p-0">
            <legend className="text-[1.5rem] font-bold uppercase">
              Rating
            </legend>
            <div className="flex mt-2" aria-label={`${displayedRating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  aria-label={`${star} star${star === 1 ? "" : "s"}`}
                  aria-pressed={rating === star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="border-0 bg-transparent cursor-pointer p-1"
                >
                  <svg
                    className={`h-8 w-8 ${star <= displayedRating ? "fill-[#55c57a]" : "fill-[#bbb]"}`}
                  >
                    <use href="/img/icons.svg#icon-star" />
                  </svg>
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            className="leading-[normal] text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
          >
            Submit review
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReviewForm;
