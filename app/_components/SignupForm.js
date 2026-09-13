import { signup } from "../_utils/api";
import SubmitButton from "./SubmitButton";

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
    minLength: 8,
  },
  {
    name: "passwordConfirm",
    label: "Confirm password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
    minLength: 8,
  },
];

export default async function SignupForm({ searchParams }) {
  const { error } = await searchParams;

  return (
    <form action={signup}>
      {fields.map(({ label, ...field }) => (
        <div className="mb-10 last-of-type:mb-12" key={field.name}>
          <label
            className="block text-[1.6rem] font-bold mb-3"
            htmlFor={field.name}
          >
            {label}
          </label>
          <input
            {...field}
            id={field.name}
            required
            className="leading-[normal] font-normal block [font-family:inherit] text-[1.5rem] text-inherit border-0 w-full bg-[#f2f2f2] [border-top:3px_solid_transparent] [border-bottom:3px_solid_transparent] transition-all ease-[ease] duration-300 rounded-[4px] box-border py-5 px-7 focus:outline-none focus:[border-bottom:3px_solid_#55c57a] focus:invalid:[border-bottom:3px_solid_#ff7730] placeholder:text-[#bbb]"
          />
        </div>
      ))}

      <SubmitButton
        text="Sign up"
        loadingText="Creating account..."
        className="text-[1.6rem] rounded-[10rem] uppercase inline-block no-underline relative transition-all ease-[ease] duration-400 font-normal backface-hidden border-0 cursor-pointer bg-[#55c57a] text-white py-[1.4rem] px-12 hover:[transform:translateY(-3px)] hover:shadow-[0_1rem_2rem_rgba(0,_0,_0,_0.15)] active:[transform:translateY(-1px)] active:shadow-[0_0.5rem_1rem_rgba(0,_0,_0,_0.15)] focus:outline-none focus:bg-[#2e864b]"
      />

      {error && (
        <p role="alert" className="text-[#eb4d4b] text-[1.4rem] mt-8">
          {error}
        </p>
      )}
    </form>
  );
}
