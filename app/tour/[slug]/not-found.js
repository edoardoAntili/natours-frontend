function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f7f7f7] px-12 py-32">
      <div className="max-w-320 text-center">
        <h1 className="mb-12 text-[3.5rem] leading-[1.3] font-bold tracking-[0.1rem] uppercase">
          This tour could not be loaded
        </h1>

        <form action="/" method="get">
          <button
            className="cursor-pointer rounded-[10rem] border-0 bg-[#55c57a] px-12 py-[1.4rem] text-[1.6rem] leading-normal font-normal text-white uppercase transition-all duration-400 ease-[ease] hover:-translate-y-[3px] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:-translate-y-[1px] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:bg-[#2e864b] focus:outline-none"
            type="submit"
          >
            Go back home
          </button>
        </form>
      </div>
    </main>
  );
}

export default NotFound;
