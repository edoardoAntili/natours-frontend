"use client";

import { useSearchParams } from "next/navigation";

function SuccessMessage({ successName }) {
  const searchParams = useSearchParams();
  const success = searchParams.get(successName);

  if (!success) return null;

  return <span className="form__success">{success}</span>;
}

export default SuccessMessage;
