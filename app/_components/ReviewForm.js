import { createReview } from "@/app/_utils/api";
import SubmitButton from "./SubmitButton";

function ReviewForm({ tourId, slug, error }) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <section className="bg-[#f7f7f7] px-12 py-24">
      <div className="max-w-220 bg-white rounded-[1rem] shadow-[0_1rem_4rem_rgba(0,_0,_0,_0.12)] my-0 mx-auto p-12">
        <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] mb-8">
          Share your experience
        </h2>
        <form action={createReview} className="grid gap-6">
          <input type="hidden" name="tourId" value={tourId} />
          <input type="hidden" name="slug" value={slug} />
          <label className="text-[1.5rem] font-bold uppercase">
            Review
            <textarea
              name="review"
              required
              maxLength={5000}
              placeholder="Tell other travelers about your tour"
              className="block w-full min-h-36 border border-[#ddd] rounded-[3px] text-[1.6rem] font-normal resize-y mt-2 p-4"
            />
          </label>

          <fieldset className="border-0 p-0">
            <legend className="text-[1.5rem] font-bold uppercase">
              Rating
            </legend>
            <div className="flex flex-row-reverse justify-end mt-2">
              {ratings.flatMap((rating) => [
                <input
                  key={`input-${rating}`}
                  className="peer absolute opacity-0"
                  id={`rating-${rating}`}
                  name="rating"
                  type="radio"
                  value={rating}
                  required
                />,
                <label
                  key={`label-${rating}`}
                  htmlFor={`rating-${rating}`}
                  className="block cursor-pointer text-[#bbb] p-1 hover:text-[#55c57a] hover:[&~label]:text-[#55c57a] peer-focus-visible:outline-2 peer-focus-visible:outline-[#55c57a] peer-checked:text-[#55c57a]"
                >
                  <svg className="h-8 w-8 fill-current">
                    <use href="/img/icons.svg#icon-star" />
                  </svg>
                  <span className="sr-only">
                    {rating} star{rating === 1 ? "" : "s"}
                  </span>
                </label>,
              ])}
            </div>
          </fieldset>

          <SubmitButton
            text="Submit review"
            loadingText="Submitting review..."
            className="leading-[normal] text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
          />

          {error && (
            <p className="text-[1.4rem] text-[#eb4d4b]" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ReviewForm;
