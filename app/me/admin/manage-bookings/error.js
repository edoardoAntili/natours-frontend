"use client";

import AccountRouteError from "../../../_components/AccountRouteError";

export default function ManageBookingsError({ reset }) {
  return <AccountRouteError resource="bookings" retry={reset} />;
}
