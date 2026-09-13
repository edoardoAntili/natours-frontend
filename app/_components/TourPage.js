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
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">
            <Image
              className="header__hero-img"
              src={`/img/tours/${tour.imageCover}`}
              alt={tour.name}
              fill
              priority
            />
          </div>
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name}</span>
          </h1>

          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="/img/icons.svg#icon-clock" />
              </svg>

              <span className="heading-box__text">{tour.duration} days</span>
            </div>

            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use href="/img/icons.svg#icon-map-pin" />
              </svg>

              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>

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

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

              {tour.guides.map((guide) => (
                <div className="overview-box__detail" key={guide._id}>
                  <Image
                    className="overview-box__img"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "auto",
                      height: "3.5rem",
                    }}
                  />

                  <span className="overview-box__label">
                    {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"}
                  </span>

                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>

          {tour.description.split("\n").map((paragraph, index) => (
            <p className="description__text" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section-pictures">
        {tour.images.map((image, index) => (
          <div className="picture-box" key={image}>
            <Image
              className={`picture-box__img picture-box__img--${index + 1}`}
              src={`/img/tours/${image}`}
              alt={`${tour.name} Tour ${index + 1}`}
              width={2000}
              height={1333}
            />
          </div>
        ))}
      </section>

      <section className="section-map">
        <TourMapWrapper locations={tour.locations} />
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>

          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${tour.images[1]}`}
            alt="Tour picture"
          />

          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${tour.images[2]}`}
            alt="Tour picture"
          />

          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>

            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>

            {user ? (
              <button
                className="btn btn--green span-all-rows"
                data-tour-id={tour.id}
              >
                Book tour now!
              </button>
            ) : (
              <Link href="/login" className="btn btn--green span-all-rows">
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
