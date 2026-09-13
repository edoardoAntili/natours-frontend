import { updatePassword } from "../_utils/api";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";
import SuccessMessage from "./SuccessMessage";

export default function PasswordChange() {
  return (
    <div className="max-w-272 my-0 mx-auto py-0 px-32">
      <h2 className="text-[2.25rem] uppercase font-bold [background-image:linear-gradient(to_right,_#7dd56f,_#28b487)] bg-clip-text text-transparent tracking-[0.1rem] leading-[1.3] inline-block mb-12!">
        Password change
      </h2>

      <form action={updatePassword}>
        <div className="not-last:mb-10">
          <label
            className="block text-[1.6rem] font-bold mb-3"
            htmlFor="password-current"
          >
            Current password
          </label>

          <input
            id="password-current"
            className="leading-[normal] font-normal block [font-family:inherit] text-[1.5rem] text-inherit border-0 w-full bg-[#f2f2f2] [border-top:3px_solid_transparent] [border-bottom:3px_solid_transparent] transition-all ease-[ease] duration-300 rounded-[4px] box-border py-5 px-7 focus:outline-none focus:[border-bottom:3px_solid_#55c57a] focus:invalid:[border-bottom:3px_solid_#ff7730] placeholder:text-[#bbb]"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            name="passwordCurrent"
          />
        </div>

        <div className="not-last:mb-10">
          <label
            className="block text-[1.6rem] font-bold mb-3"
            htmlFor="password"
          >
            New password
          </label>

          <input
            id="password"
            className="leading-[normal] font-normal block [font-family:inherit] text-[1.5rem] text-inherit border-0 w-full bg-[#f2f2f2] [border-top:3px_solid_transparent] [border-bottom:3px_solid_transparent] transition-all ease-[ease] duration-300 rounded-[4px] box-border py-5 px-7 focus:outline-none focus:[border-bottom:3px_solid_#55c57a] focus:invalid:[border-bottom:3px_solid_#ff7730] placeholder:text-[#bbb]"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            name="password"
          />
        </div>

        <div className="mb-14! not-last:mb-10">
          <label
            className="block text-[1.6rem] font-bold mb-3"
            htmlFor="password-confirm"
          >
            Confirm password
          </label>

          <input
            id="password-confirm"
            className="leading-[normal] font-normal block [font-family:inherit] text-[1.5rem] text-inherit border-0 w-full bg-[#f2f2f2] [border-top:3px_solid_transparent] [border-bottom:3px_solid_transparent] transition-all ease-[ease] duration-300 rounded-[4px] box-border py-5 px-7 focus:outline-none focus:[border-bottom:3px_solid_#55c57a] focus:invalid:[border-bottom:3px_solid_#ff7730] placeholder:text-[#bbb]"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
            name="passwordConfirm"
          />
        </div>

        <div className="text-right! not-last:mb-10">
          <ErrorMessage errorName="errorPassword" />
          <SuccessMessage successName="successPassword" />

          <SubmitButton
            text="Save password"
            loadingText="Saving..."
            className="text-[1.4rem]! rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-5! px-12! hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
          />
        </div>
      </form>
    </div>
  );
}
