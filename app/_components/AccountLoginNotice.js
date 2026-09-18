import Link from "next/link";

export default function AccountLoginNotice() {
  return (
    <div className="max-w-220 bg-white shadow-[0_2.5rem_8rem_2rem_rgba(0,_0,_0,_0.06)] rounded-[5px] my-0 mx-auto py-12 px-8 sm:py-20 sm:px-16 lg:px-28 text-center">
      <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-8!">
        You are not logged in
      </h2>
      <p className="text-[1.7rem] mb-12">
        Log in to view and update your account.
      </p>
      <Link
        href="/login"
        className="text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline transition-all ease-[ease] duration-400 font-normal backface-hidden bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
      >
        Log in
      </Link>
    </div>
  );
}
