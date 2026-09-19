export default function ServiceUnavailable({ resource = "tours" }) {
  return (
    <section
      role="alert"
      className="mx-auto max-w-240 rounded-xl border border-amber-200 bg-white px-8 py-12 text-center shadow-sm"
    >
      <h1 className="text-[2.25rem] font-bold text-[#444]">
        Unable to load {resource}
      </h1>
      <p className="mt-4 text-[1.6rem]">
        Our service is temporarily unavailable. Please try again shortly.
      </p>
      <form action="" method="get" className="mt-8">
        <button
          type="submit"
          className="uppercase cursor-pointer rounded-full bg-[#55c57a] px-8 py-4 text-[1.5rem] font-semibold text-white hover:bg-[#2e864b]"
        >
          Try again
        </button>
      </form>
    </section>
  );
}
