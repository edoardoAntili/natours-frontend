import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import OverviewBoxDetail from "@/app/_components/OverviewBoxDetail";
import TourMapWrapper from "@/app/_components/TourMapWrapper";
import ReviewCard from "@/app/_components/ReviewCard";
import BookingOptions from "@/app/_components/BookingOptions";
import ReviewForm from "@/app/_components/ReviewForm";
import TourLikeButton from "@/app/_components/TourLikeButton";
import ServiceUnavailable from "@/app/_components/ServiceUnavailable";
import {
  createCheckoutSession,
  getLoggedInUser,
  getPersonalTourBySlug,
  getTourBySlug,
  setLikedTour,
} from "@/app/_utils/api";

async function PersonalLikeButton({ tourId }) {
  const user = await getLoggedInUser();
  const initialLiked = user?.likedTours?.includes(tourId) ?? false;
  return (
    <TourLikeButton
      key={`${tourId}-${initialLiked}`}
      tourId={tourId}
      initialLiked={initialLiked}
      isLoggedIn={Boolean(user)}
      setLikedTour={setLikedTour}
    />
  );
}

async function PersonalBookingOptions({ slug, tourId }) {
  const user = await getLoggedInUser();
  if (!user)
    return (
      <Link
        href="/login"
        className="justify-self-start xl:row-span-full text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
      >
        Log in to book
      </Link>
    );
  if (user.role !== "user") return null;

  const jwt = (await cookies()).get("jwt")?.value;
  const result = await getPersonalTourBySlug(slug, jwt);
  if (result.status !== "success")
    return <ServiceUnavailable resource="booking dates" />;
  const availableDates = result.tour.startDates;
  return (
    <BookingOptions
      startDates={[...availableDates].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      )}
      tourId={tourId}
      createCheckoutSession={createCheckoutSession}
    />
  );
}

async function PersonalReviewForm({ tour, slug, searchParams }) {
  const { reviewError, reviewSuccess } = await searchParams;
  if (reviewSuccess)
    return (
      <section className="bg-[#f7f7f7] px-12 py-24">
        <div className="max-w-220 bg-white rounded-[1rem] shadow-[0_1rem_4rem_rgba(0,_0,_0,_0.12)] my-0 mx-auto p-12">
          <p className="text-[1.8rem] text-[#55c57a]" role="status">
            Review submitted successfully. Thanks for sharing your experience!
          </p>
        </div>
      </section>
    );

  const user = await getLoggedInUser();
  if (user?.role !== "user") return null;
  const jwt = (await cookies()).get("jwt")?.value;
  const result = await getPersonalTourBySlug(slug, jwt);
  if (result.status !== "success") return null;
  const hasCompletedBooking = result.tour.bookings?.some(
    ({ bookedDate }) => new Date(bookedDate.date) < new Date(),
  );
  const hasReviewed = tour.reviews?.some(
    ({ user: reviewUser }) => reviewUser?._id === user._id,
  );
  return hasCompletedBooking && !hasReviewed ? (
    <ReviewForm tourId={tour._id} slug={slug} error={reviewError} />
  ) : null;
}

async function PersonalBookingSection({ tour, slug }) {
  const user = await getLoggedInUser();
  if (user?.role && user.role !== "user") return null;
  return (
    <section className="bg-[#f7f7f7] px-6 pt-16 pb-20 sm:px-12 lg:mt-[calc(0px_-_9vw)] lg:pt-[calc(15rem_+_9vw)] lg:pb-44">
      <div className="relative max-w-420 overflow-hidden bg-white rounded-[2rem] shadow-[0_3rem_8rem_0.5rem_rgba(0,_0,_0,_0.15)] my-0 mx-auto px-8 py-12 sm:px-16 lg:py-24 lg:pr-16 lg:pl-76 xl:py-36 xl:pr-20 xl:pl-84">
        <div className="hidden lg:flex h-60 w-60 absolute left-0 top-1/2 rounded-full shadow-[1rem_0.5rem_3rem_rgba(0,_0,_0,_0.15)] flex items-center justify-center [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] z-10 [transform:translate(-35%,_-50%)] py-8 px-8 [&_img]:w-full">
          <Image
            className="h-auto"
            src="/img/logo-white.png"
            alt="Natours logo"
            width={195}
            height={100}
            sizes="110px"
          />
        </div>

        <Image
          className="hidden lg:flex h-60 w-60 absolute left-0 top-1/2 rounded-full shadow-[1rem_0.5rem_3rem_rgba(0,_0,_0,_0.15)] [transform:translate(-10%,_-50%)_scale(0.97)] z-9"
          src={`/img/tours/${tour.images[1]}`}
          alt="Tour picture"
          width={2000}
          height={1333}
          sizes="150px"
        />

        <Image
          className="hidden lg:flex h-60 w-60 absolute left-0 top-1/2 rounded-full shadow-[1rem_0.5rem_3rem_rgba(0,_0,_0,_0.15)] [transform:translate(15%,_-50%)_scale(0.94)] z-8"
          src={`/img/tours/${tour.images[2]}`}
          alt="Tour picture"
          width={2000}
          height={1333}
          sizes="150px"
        />

        <div className="grid grid-cols-1 gap-6 items-center xl:grid-rows-[auto_auto] xl:grid-cols-[1fr_auto] xl:gap-[0.7rem] xl:grid-flow-col">
          <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block">
            What are you waiting for?
          </h2>

          <p className="text-[1.9rem] font-normal">
            {tour.duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>

          <Suspense
            fallback={
              <span className="block h-14 w-48 rounded-full bg-[#55c57a]/20" />
            }
          >
            <PersonalBookingOptions slug={slug} tourId={tour._id} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function TourPage({ params, searchParams }) {
  const { slug } = await params;
  const result = await getTourBySlug(slug);
  if (result.status === "not-found") notFound();
  if (result.status === "error")
    return (
      <main className="flex-1 bg-[#f7f7f7] px-6 py-20">
        <ServiceUnavailable resource="this tour" />
      </main>
    );
  const { tour } = result;
  return (
    <PublicTourContent
      slug={slug}
      tour={tour}
      likeButton={
        <Suspense
          key="like-button"
          fallback={
            <span className="block h-14 w-14 rounded-full bg-white/70" />
          }
        >
          <PersonalLikeButton tourId={tour._id} />
        </Suspense>
      }
      bookingSection={
        <Suspense key="booking-section" fallback={null}>
          <PersonalBookingSection tour={tour} slug={slug} />
        </Suspense>
      }
      reviewSection={
        <Suspense key="review-section" fallback={null}>
          <PersonalReviewForm
            tour={tour}
            slug={slug}
            searchParams={searchParams}
          />
        </Suspense>
      }
    />
  );
}

async function PublicTourContent({
  slug,
  tour,
  likeButton,
  bookingSection,
  reviewSection,
}) {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag(`tour:${slug}`);
  const sortedStartDates = [...tour.startDates].sort(
    (firstDate, secondDate) =>
      new Date(firstDate.date) - new Date(secondDate.date),
  );

  return (
    <main>
      <section className="relative h-[48rem] sm:h-[54rem] lg:h-[38vw] [clip-path:polygon(_0_0,_100%_0,_100%_calc(100%_-_9vw),_0_100%_)]">
        <div className="h-full">
          <div className="relative w-full h-full [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] opacity-[0.85]">
            <Image
              className="object-cover h-full w-full object-[50%_25%]"
              src={`/img/tours/${tour.imageCover}`}
              alt={tour.name}
              fill
              priority
            />
          </div>
        </div>

        <div className="absolute right-[4vw] top-[4vw] z-10">{likeButton}</div>

        <div className="absolute w-full px-6 left-1/2 top-[45%] lg:w-auto lg:px-0 lg:bottom-[13vw] lg:top-[35%] [transform:translate(-50%,_-50%)]">
          <h1 className="text-white uppercase font-light text-[3.6rem] sm:text-[4.4rem] lg:text-[5rem] text-center w-full max-w-[48rem] lg:w-[70%] my-0 mx-auto [&_span]:leading-[1] [&_span]:box-decoration-clone [&_span]:[background-image:linear-gradient(_to_bottom_right,_rgba(125,_213,_111,_0.85),_rgba(40,_180,_135,_0.85)_)] [&_span]:py-4 [&_span]:px-6">
            <span>{tour.name}</span>
          </h1>

          <div className="text-[#f7f7f7] flex items-center justify-center gap-6 mt-12 flex-wrap">
            <div className="text-[1.5rem] font-bold uppercase flex items-center text-shadow-[0_0.5rem_2rem_rgba(0,_0,_0,_0.15)] [&_svg]:mr-[0.8rem] lg:not-last:mr-16">
              <svg className="h-8 w-8 fill-current [filter:drop-shadow(0_0.75rem_0.5rem_rgba(0,_0,_0,_0.25))]">
                <use href="/img/icons.svg#icon-clock" />
              </svg>

              <span>{tour.duration} days</span>
            </div>

            <div className="text-[1.5rem] font-bold uppercase flex items-center text-shadow-[0_0.5rem_2rem_rgba(0,_0,_0,_0.15)] [&_svg]:mr-[0.8rem] lg:not-last:mr-16">
              <svg className="h-8 w-8 fill-current [filter:drop-shadow(0_0.75rem_0.5rem_rgba(0,_0,_0,_0.25))]">
                <use href="/img/icons.svg#icon-map-pin" />
              </svg>

              <span>{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fcfcfc] flex flex-col lg:flex-row mt-[calc(0px_-_9vw)] [&>*]:min-w-0 [&>*]:px-8 [&>*]:py-16 [&>*:first-child]:pt-[calc(9vw_+_4rem)] sm:[&>*]:px-16 lg:[&>*]:flex-[0_0_50%] lg:[&>*]:pt-[14vw] lg:[&>*]:px-[6vw] lg:[&>*]:pb-[calc(1vw_+_9vw)]">
        <div className="bg-[#f7f7f7] flex justify-center [&>div]:w-full lg:[&>div]:w-auto">
          <div>
            <div className="not-last:mb-16 lg:not-last:mb-28">
              <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-14!">
                Quick facts
              </h2>

              <OverviewBoxDetail
                label="Next date"
                text={new Date(sortedStartDates[0].date).toLocaleString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  },
                )}
                icon="calendar"
              />

              <OverviewBoxDetail
                label="Difficulty"
                text={tour.difficulty}
                icon="trending-up"
              />

              <OverviewBoxDetail
                label="Participants"
                text={`${tour.maxGroupSize} people`}
                icon="user"
              />

              <OverviewBoxDetail
                label="Rating"
                text={`${tour.ratingsAverage} / 5`}
                icon="star"
              />
            </div>

            <div className="not-last:mb-16 lg:not-last:mb-28">
              <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-14!">
                Your tour guides
              </h2>

              {tour.guides.map((guide) => (
                <div
                  className="text-[1.5rem] flex items-center font-normal [&_svg]:mr-5 not-last:mb-9"
                  key={guide._id}
                >
                  <Image
                    className="inline w-auto rounded-full h-14 mr-5"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />

                  <span className="font-bold uppercase text-[1.4rem] mr-9">
                    {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"}
                  </span>

                  <span className="capitalize">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-14!">
            About {tour.name} tour
          </h2>

          {tour.description.split("\n").map((paragraph, index) => (
            <p className="text-[1.7rem] not-last:mb-8" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section
        aria-label="Tour photos"
        className="relative z-10 flex flex-col bg-[#fcfcfc] px-6 py-12 sm:px-12 lg:z-1000 lg:mt-[calc(0px_-_9vw)] lg:flex-row lg:bg-transparent lg:px-0 lg:py-0 lg:[clip-path:polygon(_0_9vw,_100%_0,_100%_calc(100%_-_9vw),_0_100%_)]"
      >
        {tour.images.map((image, index) => (
          <div
            className={`relative w-[88%] min-w-0 shadow-[0_1rem_3rem_rgba(0,_0,_0,_0.15)] first:mt-0 -mt-10 sm:-mt-16 lg:mx-0 lg:mt-0 lg:w-auto lg:flex-1 lg:shadow-none ${index === 1 ? "ml-auto" : "mr-auto"}`}
            style={{ zIndex: index + 1 }}
            key={image}
          >
            <Image
              className={`block h-[22rem] w-full rounded-lg object-cover sm:h-[32rem] lg:h-[110%] lg:rounded-none ${["lg:pt-[15%]", "lg:pb-[15%]", "lg:pb-[27%]"][index] ?? ""}`}
              src={`/img/tours/${image}`}
              alt={`${tour.name} Tour ${index + 1}`}
              width={2000}
              height={1333}
            />
          </div>
        ))}
      </section>

      <section className="relative h-[40rem] sm:h-[50rem] lg:mt-[calc(0px_-_9vw)] lg:h-260">
        <TourMapWrapper locations={tour.locations} />
      </section>

      <section className="relative z-10 [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] py-12 px-0 lg:z-1000 lg:mt-[calc(0px_-_9vw)] lg:py-[calc(5rem_+_9vw)] lg:[clip-path:polygon(_0_9vw,_100%_0,_100%_calc(100%_-_9vw),_0_100%_)]">
        <div className="grid gap-x-6 sm:gap-x-12 lg:gap-x-24 grid-flow-col overflow-x-scroll snap-x snap-mandatory py-20 px-0 [&::before]:content-[''] [&::before]:w-8 [&::after]:content-[''] [&::after]:w-8">
          {tour.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>

      {bookingSection}
      {reviewSection}
    </main>
  );
}

export default TourPage;
