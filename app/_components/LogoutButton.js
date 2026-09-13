import { logout } from "../_utils/api";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="leading-[normal] text-[#f7f7f7] uppercase text-[1.6rem] no-underline inline-flex items-center transition-all ease-[ease] duration-200 font-normal bg-transparent border-0 cursor-pointer [font-family:inherit] mr-8 hover:[transform:translateY(-2px)] hover:text-shadow-[0_0.7rem_1rem_black] active:[transform:translateY(-2px)] active:text-shadow-[0_0.7rem_1rem_black] not-last:mr-12 focus:outline-none [@media(max-width:37.5em)]:not-last:mr-0 [@media(max-width:37.5em)]:not-last:mb-[1.2rem]"
      >
        Log out
      </button>
    </form>
  );
}
