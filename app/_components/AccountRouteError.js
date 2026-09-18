"use client";

export default function AccountRouteError({ resource, retry }) {
  return (
    <section role="alert" className="px-8 sm:px-12 xl:px-20">
      <div className="rounded-xl border border-red-200 bg-red-50 px-8 py-8 text-red-800">
        <h2 className="text-[1.8rem] font-semibold">Unable to load {resource}</h2>
        <p className="mt-2 text-[1.5rem]">
          There was a problem while loading your {resource}. Please try again.
        </p>
        {retry && (
          <button
            type="button"
            onClick={retry}
            className="mt-5 rounded-lg bg-[#2f8f45] px-5 py-3 text-[1.4rem] font-semibold text-white hover:bg-[#25783a]"
          >
            Try again
          </button>
        )}
      </div>
    </section>
  );
}
