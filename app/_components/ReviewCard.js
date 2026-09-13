import Image from "next/image";

function ReviewCard({ review }) {
  return (
    <div className="w-120 bg-[#f7f7f7] rounded-[3px] shadow-[0_1.5rem_4rem_rgba(0,_0,_0,_0.15)] snap-center flex flex-col items-center py-16 px-16">
      <div className="flex items-center mb-8">
        <Image
          className="h-18 w-auto rounded-full mr-6"
          src={`/img/users/${review.user.photo}`}
          alt={review.user.name}
          width={45}
          height={45}
          sizes="45px"
        />

        <h6 className="text-[1.5rem] font-bold uppercase">
          {review.user.name}
        </h6>
      </div>

      <p className="text-[1.5rem] italic font-normal mb-8">{review.review}</p>

      <div className="flex mt-auto">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-8 w-8 mr-[1px] ${
              review.rating >= star ? "fill-[#55c57a]" : "fill-[#bbb]"
            }`}
          >
            <use href="/img/icons.svg#icon-star" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default ReviewCard;
