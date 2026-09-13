"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ className, text, loadingText }) {
  const { pending } = useFormStatus();

  return (
    <button className={`leading-[normal] ${className}`} type="submit">
      {pending ? loadingText : text}
    </button>
  );
}

export default SubmitButton;
