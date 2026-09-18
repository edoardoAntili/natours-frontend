import { Suspense } from "react";
import Link from "next/link";
import AccountLoginNotice from "../../_components/AccountLoginNotice";
import Loading from "../../_components/Loading";
import AccountRouteError from "../../_components/AccountRouteError";
import { getMyReviews } from "../../_utils/api";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(date));

async function ReviewsContent({ searchParams }) {
  const { page: requestedPage } = await searchParams;
  const page = Number(requestedPage);
  const currentPage = Number.isSafeInteger(page) && page > 0 ? page : 1;
  const result = await getMyReviews(currentPage);
  if (result.status === "unauthenticated") return <AccountLoginNotice />;
  if (result.status === "error") return <AccountRouteError resource="reviews" />;

  const { reviews, pagination } = result;
  const firstResult = (pagination.page - 1) * pagination.limit + 1;
  const lastResult = firstResult + reviews.length - 1;

  return (
    <section className="px-8 sm:px-12 xl:px-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3]">
            My reviews
          </h1>
          <p className="mt-2 text-[1.4rem] text-gray-500">
            Your thoughts on tours you have taken.
          </p>
        </div>
        <span className="rounded-full bg-[#e8f7e5] px-5 py-2 text-[1.3rem] font-semibold text-[#2f8f45]">
          {pagination.totalResults}{" "}
          {pagination.totalResults === 1 ? "review" : "reviews"}
        </span>
      </div>

      {pagination.totalResults === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white px-8 py-12 text-[1.6rem] text-gray-600">
          You have not written any reviews yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[62rem] border-collapse text-left text-[1.4rem]">
              <thead className="bg-[#f3faf1] text-[1.2rem] uppercase tracking-wider text-[#417d48]">
                <tr>
                  <th scope="col" className="w-[22%] px-6 py-5 font-semibold">Tour</th>
                  <th scope="col" className="w-[15%] px-6 py-5 font-semibold">Rating</th>
                  <th scope="col" className="w-[45%] px-6 py-5 font-semibold">Your review</th>
                  <th scope="col" className="w-[18%] px-6 py-5 font-semibold">Reviewed on</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map((review) => (
                  <tr key={review._id} className="align-top text-gray-700 hover:bg-[#fbfdfb]">
                    <th scope="row" className="px-6 py-6 font-semibold text-gray-900">
                      {review.tour?.slug ? (
                        <Link href={`/tour/${review.tour.slug}`} className="hover:text-[#2f8f45] hover:underline">
                          {review.tour.name}
                        </Link>
                      ) : (
                        review.tour?.name ?? "Tour unavailable"
                      )}
                    </th>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-amber-50 px-4 py-1 font-semibold text-amber-800">
                        <span aria-hidden="true" className="text-amber-500">★</span>
                        {review.rating} / 5
                      </span>
                    </td>
                    <td className="max-w-[34rem] whitespace-pre-wrap wrap-break-word px-6 py-6 leading-relaxed">
                      {review.review}
                    </td>
                    <td className="whitespace-nowrap px-6 py-6">
                      {formatDate(review.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Reviews pages" className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[1.4rem]">
            <p className="text-gray-500">
              {reviews.length
                ? `Showing ${firstResult}–${lastResult} of ${pagination.totalResults}`
                : "No reviews on this page"}
            </p>
            <div className="flex items-center gap-4">
              {pagination.page > 1 && (
                <Link href={`/me/reviews?page=${pagination.page - 1}`} className="rounded-lg border border-gray-200 px-5 py-3 font-semibold text-[#2f8f45] hover:bg-[#f3faf1]">
                  Previous
                </Link>
              )}
              <span className="text-gray-600">
                Page {pagination.page}
                {pagination.page <= pagination.totalPages
                  ? ` of ${pagination.totalPages}`
                  : ""}
              </span>
              {pagination.hasNextPage && (
                <Link href={`/me/reviews?page=${pagination.page + 1}`} className="rounded-lg bg-[#2f8f45] px-5 py-3 font-semibold text-white hover:bg-[#25783a]">
                  Next
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </section>
  );
}

export default function ReviewsPage({ searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <ReviewsContent searchParams={searchParams} />
    </Suspense>
  );
}
