import { Suspense } from "react";
import Link from "next/link";
import AccountLoginNotice from "../../../_components/AccountLoginNotice";
import AccountRouteError from "../../../_components/AccountRouteError";
import DeleteReviewButton from "../../../_components/DeleteReviewButton";
import Loading from "../../../_components/Loading";
import {
  deleteAdminReview,
  getAdminReviews,
} from "../../../_utils/api";

export const metadata = {
  title: "Manage reviews",
  description: "Manage tour reviews in Natours.",
};

function Notice({ type, children }) {
  const styles =
    type === "error"
      ? "border-red-200 bg-red-50 text-[#b83232]"
      : "border-green-200 bg-green-50 text-[#2f8f45]";
  return (
    <p role={type === "error" ? "alert" : "status"} className={`mb-8 rounded-lg border px-6 py-4 text-[1.4rem] ${styles}`}>
      {children}
    </p>
  );
}

async function ReviewsContent({ searchParams }) {
  const params = await searchParams;
  const query = typeof params.query === "string" ? params.query.trim() : "";
  const requestedPage = Number(params.page);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const result = await getAdminReviews(query, page);

  if (result.status === "unauthenticated") return <AccountLoginNotice />;
  if (result.status === "forbidden")
    return (
      <section className="px-8 sm:px-12 xl:px-20">
        <Notice type="error">Admin access required.</Notice>
      </section>
    );
  if (result.status === "error")
    return <AccountRouteError resource="reviews" />;

  const { reviews, pagination } = result;
  const firstResult = (pagination.page - 1) * pagination.limit + 1;
  const lastResult = firstResult + reviews.length - 1;
  const pageHref = (nextPage) => {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set("query", query);
    if (nextPage > 1) nextParams.set("page", String(nextPage));
    const search = nextParams.toString();
    return `/me/admin/manage-reviews${search ? `?${search}` : ""}`;
  };

  return (
    <section className="px-8 sm:px-12 xl:px-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3]">
            Manage reviews
          </h1>
          <p className="mt-2 text-[1.4rem] text-gray-500">
            Find user reviews and remove inappropriate content.
          </p>
        </div>
        <span className="rounded-full bg-[#e8f7e5] px-5 py-2 text-[1.3rem] font-semibold text-[#2f8f45]">
          {pagination.totalResults} {pagination.totalResults === 1 ? "review" : "reviews"}
        </span>
      </div>

      {params.error && <Notice type="error">{params.error}</Notice>}
      {params.success && <Notice type="success">{params.success}</Notice>}

      <form method="get" className="mb-10 flex flex-col gap-4 sm:flex-row">
        <label htmlFor="review-search" className="sr-only">
          Search by user name or email
        </label>
        <input
          id="review-search"
          name="query"
          type="search"
          defaultValue={query}
          placeholder="Search user name or email"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-5 py-3 text-[1.5rem] outline-none focus:border-[#55c57a] focus:ring-2 focus:ring-[#55c57a]/20"
        />
        <button type="submit" className="rounded-lg bg-[#2f8f45] px-7 py-3 text-[1.4rem] font-semibold text-white hover:bg-[#25783a]">
          Search
        </button>
        {query && (
          <Link href="/me/admin/manage-reviews" className="rounded-lg border border-gray-200 px-7 py-3 text-center text-[1.4rem] font-semibold text-gray-600 hover:bg-gray-50">
            Clear
          </Link>
        )}
      </form>

      {pagination.totalResults === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white px-8 py-12 text-[1.6rem] text-gray-600">
          {query ? `No reviews found for “${query}”.` : "No reviews available."}
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[90rem] border-collapse text-left text-[1.4rem]">
              <thead className="bg-[#f3faf1] text-[1.2rem] uppercase tracking-wider text-[#417d48]">
                <tr>
                  <th scope="col" className="px-6 py-5 font-semibold">Email</th>
                  <th scope="col" className="px-6 py-5 font-semibold">User</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Tour</th>
                  <th scope="col" className="w-[40%] px-6 py-5 font-semibold">Review</th>
                  <th scope="col" className="px-6 py-5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map((review) => (
                  <tr key={review._id} className="align-top text-gray-700 hover:bg-[#fbfdfb]">
                    <td className="px-6 py-6">{review.user?.email ?? "User unavailable"}</td>
                    <th scope="row" className="px-6 py-6 font-semibold text-gray-900">{review.user?.name ?? "User unavailable"}</th>
                    <td className="px-6 py-6">{review.tour?.name ?? "Tour unavailable"}</td>
                    <td className="max-w-[38rem] whitespace-pre-wrap wrap-break-word px-6 py-6 leading-relaxed">{review.review}</td>
                    <td className="px-6 py-6">
                      <DeleteReviewButton
                        action={deleteAdminReview}
                        reviewId={review._id}
                        tourSlug={review.tour?.slug ?? ""}
                        query={query}
                        page={pagination.page}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav aria-label="Review pages" className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[1.4rem]">
            <p className="text-gray-500">Showing {firstResult}–{lastResult} of {pagination.totalResults}</p>
            <div className="flex items-center gap-4">
              {pagination.page > 1 && <Link href={pageHref(pagination.page - 1)} className="rounded-lg border border-gray-200 px-5 py-3 font-semibold text-[#2f8f45] hover:bg-[#f3faf1]">Previous</Link>}
              <span className="text-gray-600">Page {pagination.page}{pagination.totalPages ? ` of ${pagination.totalPages}` : ""}</span>
              {pagination.hasNextPage && <Link href={pageHref(pagination.page + 1)} className="rounded-lg bg-[#2f8f45] px-5 py-3 font-semibold text-white hover:bg-[#25783a]">Next</Link>}
            </div>
          </nav>
        </>
      )}
    </section>
  );
}

export default function ManageReviewsPage({ searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <ReviewsContent searchParams={searchParams} />
    </Suspense>
  );
}
