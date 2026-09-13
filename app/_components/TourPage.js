import Image from "next/image";
import Link from "next/link";
import OverviewBoxDetail from "@/app/_components/OverviewBoxDetail";
import TourMapWrapper from "@/app/_components/TourMapWrapper";
import ReviewCard from "@/app/_components/ReviewCard";
import { getLoggedInUser, getTourBySlug } from "@/app/_utils/api";

async function TourPage({ params }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const user = await getLoggedInUser();

  return (
    <>
      <section className="relative h-[38vw] [clip-path:polygon(_0_0,_100%_0,_100%_calc(100%_-_9vw),_0_100%_)]">
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

        <div className="absolute bottom-[13vw] left-1/2 top-[35%] [transform:translate(-50%,_-50%)]">
          <h1 className="text-white uppercase font-light text-[5rem] text-center w-[70%] my-0 mx-auto [&_span]:leading-[1] [&_span]:box-decoration-clone [&_span]:[background-image:linear-gradient(_to_bottom_right,_rgba(125,_213,_111,_0.85),_rgba(40,_180,_135,_0.85)_)] [&_span]:py-4 [&_span]:px-6">
            <span>{tour.name}</span>
          </h1>

          <div className="text-[#f7f7f7] flex items-center justify-center mt-12">
            <div className="text-[1.5rem] font-bold uppercase flex items-center text-shadow-[0_0.5rem_2rem_rgba(0,_0,_0,_0.15)] [&_svg]:mr-[0.8rem] not-last:mr-16">
              <svg className="h-8 w-8 fill-current [filter:drop-shadow(0_0.75rem_0.5rem_rgba(0,_0,_0,_0.25))]">
                <use href="/img/icons.svg#icon-clock" />
              </svg>

              <span>{tour.duration} days</span>
            </div>

            <div className="text-[1.5rem] font-bold uppercase flex items-center text-shadow-[0_0.5rem_2rem_rgba(0,_0,_0,_0.15)] [&_svg]:mr-[0.8rem] not-last:mr-16">
              <svg className="h-8 w-8 fill-current [filter:drop-shadow(0_0.75rem_0.5rem_rgba(0,_0,_0,_0.25))]">
                <use href="/img/icons.svg#icon-map-pin" />
              </svg>

              <span>{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fcfcfc] flex mt-[calc(0px_-_9vw)] [&>*]:flex-[0_0_50%] [&>*]:pt-[14vw] [&>*]:px-[8vw] [&>*]:pb-[calc(1vw_+_9vw)]">
        <div className="bg-[#f7f7f7] flex justify-center">
          <div>
            <div className="not-last:mb-28">
              <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-14!">
                Quick facts
              </h2>

              <OverviewBoxDetail
                label="Next date"
                text={new Date(tour.startDates[0].date).toLocaleString(
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

            <div className="not-last:mb-28">
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

      <section className="flex [clip-path:polygon(_0_9vw,_100%_0,_100%_calc(100%_-_9vw),_0_100%_)] relative z-1000 mt-[calc(0px_-_9vw)]">
        {tour.images.map((image, index) => (
          <div className="relative flex-1" key={image}>
            <Image
              className={`block w-full h-[110%] object-cover ${["pt-[15%]", "pb-[15%]", "pb-[27%]"][index] ?? ""}`}
              src={`/img/tours/${image}`}
              alt={`${tour.name} Tour ${index + 1}`}
              width={2000}
              height={1333}
            />
          </div>
        ))}
      </section>

      <section className="relative h-260 mt-[calc(0px_-_9vw)]">
        <TourMapWrapper locations={tour.locations} />
      </section>

      <section className="relative z-1000 [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] [clip-path:polygon(_0_9vw,_100%_0,_100%_calc(100%_-_9vw),_0_100%_)] mt-[calc(0px_-_9vw)] py-[calc(5rem_+_9vw)] px-0">
        <div className="grid gap-x-24 grid-flow-col overflow-x-scroll snap-x snap-mandatory py-20 px-0 [&::before]:content-[''] [&::before]:w-8 [&::after]:content-[''] [&::after]:w-8">
          {tour.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>

      <section className="bg-[#f7f7f7] mt-[calc(0px_-_9vw)] pt-[calc(15rem_+_9vw)] px-12 pb-44">
        <div className="relative max-w-420 overflow-hidden bg-white rounded-[2rem] shadow-[0_3rem_8rem_0.5rem_rgba(0,_0,_0,_0.15)] my-0 mx-auto py-36 pr-20 pl-84">
          <div className="h-60 w-60 absolute left-0 top-1/2 rounded-full shadow-[1rem_0.5rem_3rem_rgba(0,_0,_0,_0.15)] flex items-center justify-center [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] z-10 [transform:translate(-35%,_-50%)] py-8 px-8 [&_img]:w-full">
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
            className="h-60 w-60 absolute left-0 top-1/2 rounded-full shadow-[1rem_0.5rem_3rem_rgba(0,_0,_0,_0.15)] [transform:translate(-10%,_-50%)_scale(0.97)] z-9"
            src={`/img/tours/${tour.images[1]}`}
            alt="Tour picture"
            width={2000}
            height={1333}
            sizes="150px"
          />

          <Image
            className="h-60 w-60 absolute left-0 top-1/2 rounded-full shadow-[1rem_0.5rem_3rem_rgba(0,_0,_0,_0.15)] [transform:translate(15%,_-50%)_scale(0.94)] z-8"
            src={`/img/tours/${tour.images[2]}`}
            alt="Tour picture"
            width={2000}
            height={1333}
            sizes="150px"
          />

          <div className="grid grid-rows-[auto_auto] grid-cols-[1fr_auto] gap-[0.7rem] grid-flow-col items-center">
            <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block">
              What are you waiting for?
            </h2>

            <p className="text-[1.9rem] font-normal">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>

            {user ? (
              <button
                className="leading-[normal] row-span-full text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
                data-tour-id={tour.id}
              >
                Book tour now!
              </button>
            ) : (
              <Link
                href="/login"
                className="row-span-full text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
              >
                Log in to book
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default TourPage;
