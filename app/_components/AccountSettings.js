import Image from "next/image";
import { updateAccountSettings } from "../_utils/api";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "./ErrorMessage";

export default function AccountSettings({ user }) {
  return (
    <div className="max-w-272 my-0 mx-auto py-0 px-8 sm:px-16 xl:px-32">
      <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-12!">
        Your account settings
      </h2>

      <form action={updateAccountSettings}>
        <div className="not-last:mb-10">
          <label className="block text-[1.6rem] font-bold mb-3" htmlFor="name">
            Name
          </label>

          <input
            id="name"
            className="leading-[normal] font-normal block [font-family:inherit] text-[1.6rem] text-inherit border-0 w-full bg-[#f2f2f2] [border-top:3px_solid_transparent] [border-bottom:3px_solid_transparent] transition-all ease-[ease] duration-300 rounded-[4px] box-border py-5 px-7 focus:outline-none focus:[border-bottom:3px_solid_#55c57a] focus:invalid:[border-bottom:3px_solid_#ff7730] placeholder:text-[#bbb]"
            type="text"
            defaultValue={user.name}
            required
            name="name"
          />
        </div>

        <div className="mb-12! not-last:mb-10">
          <label className="block text-[1.6rem] font-bold mb-3" htmlFor="email">
            Email address
          </label>

          <input
            id="email"
            className="leading-[normal] font-normal block [font-family:inherit] text-[1.6rem] text-inherit border-0 w-full bg-[#f2f2f2] [border-top:3px_solid_transparent] [border-bottom:3px_solid_transparent] transition-all ease-[ease] duration-300 rounded-[4px] box-border py-5 px-7 focus:outline-none focus:[border-bottom:3px_solid_#55c57a] focus:invalid:[border-bottom:3px_solid_#ff7730] placeholder:text-[#bbb]"
            type="email"
            defaultValue={user.email}
            required
            name="email"
          />
        </div>

        <div className="not-last:mb-10 flex items-center text-[1.6rem]">
          <Image
            className="h-30 w-30 rounded-full mr-8"
            src={`/img/users/${user.photo}`}
            alt="User photo"
            width={75}
            height={75}
            sizes="75px"
          />

          <input
            id="photo"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1] [&:focus_+_label]:[outline:3px_solid_#55c57a] [&:focus_+_label]:[outline-offset:3px] [&_+_label]:text-[#55c57a] [&_+_label]:inline-block [&_+_label]:no-underline [&_+_label]:[border-bottom:1px_solid_#55c57a] [&_+_label]:transition-all [&_+_label]:ease-[ease] [&_+_label]:duration-200 [&_+_label]:cursor-pointer [&_+_label]:py-[3px] [&_+_label]:px-[3px] [&_+_label:hover]:bg-[#55c57a] [&_+_label:hover]:text-white [&_+_label:hover]:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] [&_+_label:hover]:[transform:translateY(-2px)]"
            type="file"
            accept="image/*"
            name="photo"
          />

          <label htmlFor="photo">Choose new photo</label>
        </div>

        <div className="text-right! not-last:mb-10">
          <ErrorMessage errorName="error" />
          <SubmitButton
            text="Save settings"
            loadingText="Saving..."
            className="text-[1.4rem]! rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-5! px-12! hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
          />
        </div>
      </form>
    </div>
  );
}
