"use client";

import { useFormStatus } from "react-dom";

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[#eb4d4b] px-5 py-3 font-semibold text-white hover:bg-[#d63e3c] disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export default function DeleteReviewButton({
  action,
  reviewId,
  tourSlug,
  query,
  page,
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Delete this review permanently?"))
          event.preventDefault();
      }}
    >
      <input type="hidden" name="reviewId" value={reviewId} />
      <input type="hidden" name="tourSlug" value={tourSlug} />
      <input type="hidden" name="query" value={query} />
      <input type="hidden" name="page" value={page} />
      <DeleteButton />
    </form>
  );
}
