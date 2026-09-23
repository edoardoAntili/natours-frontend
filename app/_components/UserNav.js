import Link from "next/link";
import Image from "next/image";
import { getLoggedInUserResult } from "../_utils/api";
import LogoutButton from "./LogoutButton";

async function UserNav() {
  const result = await getLoggedInUserResult();
  if (result.status === "error")
    return (
      <span role="status" className="text-[1.4rem] text-white">
        Account temporarily unavailable
      </span>
    );
  const user = result.status === "success" ? result.user : null;

  return user ? (
    <>
      {/* <Link href="#" className="text-[#f7f7f7] uppercase text-[1.6rem] no-underline inline-flex items-center transition-all ease-[ease] duration-200 font-normal bg-transparent border-0 cursor-pointer [font-family:inherit] mr-8 hover:[transform:translateY(-2px)] hover:text-shadow-[0_0.7rem_1rem_black] active:[transform:translateY(-2px)] active:text-shadow-[0_0.7rem_1rem_black] not-last:mr-12 focus:outline-none [@media(max-width:37.5em)]:not-last:mr-0 [@media(max-width:37.5em)]:not-last:mb-[1.2rem]">
        Log out
      </Link> */}
      <LogoutButton />

      <Link
        href="/me"
        className="text-[#f7f7f7] uppercase text-[1.6rem] no-underline inline-flex items-center transition-all ease-[ease] duration-200 font-normal bg-transparent border-0 cursor-pointer [font-family:inherit] hover:[transform:translateY(-2px)] hover:text-shadow-[0_0.7rem_1rem_black] active:[transform:translateY(-2px)] active:text-shadow-[0_0.7rem_1rem_black] not-last:mr-12 focus:outline-none [@media(max-width:37.5em)]:not-last:mr-0 [@media(max-width:37.5em)]:not-last:mb-[1.2rem]"
      >
        <Image
          className="h-14 w-14 rounded-full mr-4"
          src={`/img/users/${user.photo}`}
          alt={`Photo of ${user.name}`}
          width={32}
          height={32}
        />

        <span>{user.name.split(" ")[0]}</span>
      </Link>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="text-[#f7f7f7] uppercase text-[1.6rem] no-underline inline-flex items-center transition-all ease-[ease] duration-200 font-normal bg-transparent border-0 cursor-pointer [font-family:inherit] hover:[transform:translateY(-2px)] hover:text-shadow-[0_0.7rem_1rem_black] active:[transform:translateY(-2px)] active:text-shadow-[0_0.7rem_1rem_black] not-last:mr-12 focus:outline-none [@media(max-width:37.5em)]:not-last:mr-0 [@media(max-width:37.5em)]:not-last:mb-[1.2rem]"
      >
        Log in
      </Link>

      <Link
        href="/signup"
        className="text-[#f7f7f7] uppercase text-[1.6rem] no-underline inline-flex items-center transition-all ease-[ease] duration-300 font-normal bg-transparent [border:1px_solid_currentColor]! cursor-pointer [font-family:inherit] rounded-[10rem] py-3 px-5 sm:py-4 sm:px-12 hover:[transform:translateY(-2px)] hover:text-shadow-[none] hover:bg-[#f7f7f7] hover:text-[#777] hover:[border-color:#f7f7f7] active:[transform:translateY(-2px)] active:text-shadow-[0_0.7rem_1rem_black] not-last:mr-12 focus:outline-none [@media(max-width:37.5em)]:not-last:mr-0 [@media(max-width:37.5em)]:not-last:mb-[1.2rem]"
      >
        Sign up
      </Link>
    </>
  );
}

export default UserNav;
