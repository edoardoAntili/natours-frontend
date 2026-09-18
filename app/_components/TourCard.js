import Link from "next/link";
import Image from "next/image";

function TourCard({ tour, priority = false }) {
  return (
    <div className="rounded-[3px] overflow-hidden shadow-[0_1.5rem_4rem_rgba(0,_0,_0,_0.1)] bg-white transition-all ease-[ease] duration-300 backface-hidden min-w-0 flex flex-col">
      <div className="relative">
        <div className="relative [clip-path:polygon(0_0,_100%_0%,_100%_83%,_0%_98%)] h-88">
          <div className="absolute w-full h-full [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] opacity-[0.7]">
            <Image
              className="object-cover h-full w-full"
              src={`/img/tours/${tour.imageCover}`}
              alt={tour.name}
              width={500}
              height={300}
              priority={priority}
            />
          </div>
        </div>

        <h3 className="text-white uppercase font-light text-[2.75rem] text-right absolute bottom-4 right-8 w-[70%] z-10 [&_span]:leading-[1] [&_span]:box-decoration-clone [&_span]:[background-image:linear-gradient(_to_bottom_right,_rgba(125,_213,_111,_0.85),_rgba(40,_180,_135,_0.85)_)] [&_span]:py-4 [&_span]:px-6">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-y-7 gap-x-8 py-10 px-8 sm:px-12">
        <h4 className="text-[1.2rem] uppercase font-bold col-span-full">
          {tour.difficulty} {tour.duration}-day tour
        </h4>

        <p className="col-span-full text-[1.5rem] italic -mt-4 mb-3">
          {tour.summary}
        </p>

        <div className="text-[1.3rem] flex items-center [&_svg]:mr-[0.7rem]">
          <svg className="h-8 w-8 fill-[#55c57a]">
            <use href="/img/icons.svg#icon-map-pin" />
          </svg>
          <span>{tour.startLocation.description}</span>
        </div>

        <div className="text-[1.3rem] flex items-center [&_svg]:mr-[0.7rem]">
          <svg className="h-8 w-8 fill-[#55c57a]">
            <use href="/img/icons.svg#icon-calendar" />
          </svg>
          <span>
            {new Date(tour.startDates[0].date).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="text-[1.3rem] flex items-center [&_svg]:mr-[0.7rem]">
          <svg className="h-8 w-8 fill-[#55c57a]">
            <use href="/img/icons.svg#icon-flag" />
          </svg>
          <span>{tour.locations.length} stops</span>
        </div>

        <div className="text-[1.3rem] flex items-center [&_svg]:mr-[0.7rem]">
          <svg className="h-8 w-8 fill-[#55c57a]">
            <use href="/img/icons.svg#icon-user" />
          </svg>
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>

      <div className="bg-[#f7f7f7] [border-top:1px_solid_#f1f1f1] text-[1.4rem] grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 mt-auto py-10 px-8 sm:px-12">
        <p>
          <span className="font-bold">${tour.price}</span>{" "}
          <span className="text-[#999]">per person</span>
        </p>

        <p className="row-start-2 row-end-3">
          <span className="font-bold">{tour.ratingsAverage}</span>{" "}
          <span className="text-[#999]">rating ({tour.ratingsQuantity})</span>
        </p>

        <Link
          href={`/tour/${tour.slug}`}
          className="row-start-1 row-end-3 justify-self-end self-center text-[1.4rem]! rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-5! px-8 sm:px-12! hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
