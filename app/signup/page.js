import { Suspense } from "react";
import SignupForm from "../_components/SignupForm";
import Loading from "../_components/Loading";

export const metadata = {
  title: "Sign up",
};

export default function Signup({ searchParams }) {
  return (
    <main className="bg-[#f7f7f7] flex-1 relative py-12 px-6 sm:py-20 sm:px-12 lg:py-32 lg:px-24">
      <div className="max-w-220 bg-white shadow-[0_2.5rem_8rem_2rem_rgba(0,_0,_0,_0.06)] rounded-[5px] my-0 mx-auto py-12 px-8 sm:py-20 sm:px-16 lg:px-28">
        <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-14!">
          Create your account
        </h2>

        <Suspense fallback={<Loading />}>
          <SignupForm searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
