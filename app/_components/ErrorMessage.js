"use client";

import { useSearchParams } from "next/navigation";

function ErrorMessage({ errorName }) {
  const searchParams = useSearchParams();
  const error = searchParams.get(errorName);

  if (!error) return null;

  return <span className="text-[#eb4d4b] text-[1.4rem] mx-8">{error}</span>;
}

export default ErrorMessage;
