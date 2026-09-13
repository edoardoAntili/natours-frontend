"use client";

import { useSearchParams } from "next/navigation";

function ErrorMessage({ errorName }) {
  const searchParams = useSearchParams();
  const error = searchParams.get(errorName);

  if (!error) return null;

  return <span className="form__error">{error}</span>;
}

export default ErrorMessage;
