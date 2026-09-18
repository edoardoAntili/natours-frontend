"use client";

import AccountRouteError from "../../_components/AccountRouteError";

export default function Error({ retry }) {
  return <AccountRouteError resource="liked tours" retry={retry} />;
}
