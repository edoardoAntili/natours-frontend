"use client";

import { useSearchParams } from "next/navigation";

function SuccessMessage({ successName }) {
  const searchParams = useSearchParams();
  const success = searchParams.get(successName);

  if (!success) return null;

  return <span className="text-[#55c57a] text-[1.4rem] mx-8">{success}</span>;
}

export default SuccessMessage;
