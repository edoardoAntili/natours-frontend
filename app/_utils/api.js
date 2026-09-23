import { createHash } from "node:crypto";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const serviceError = "Service temporarily unavailable. Please try again.";

async function requestJson(url, options) {
  try {
    const response = await fetch(url, options);
    return { response, data: await response.json() };
  } catch {
    return null;
  }
}

const getUserCacheTag = (jwt) =>
  `user:${createHash("sha256").update(jwt).digest("hex")}`;

const getTourCacheTag = (slug) => `tour:${slug}`;

const getUser = async function (jwt) {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag(getUserCacheTag(jwt));
  const res = await fetch(`${process.env.SERVER_URL}api/v1/users/me`, {
    headers: {
      Cookie: `jwt=${jwt}`,
    },
  });
  if (res.status === 401) return { status: "unauthenticated" };
  if (!res.ok) throw new Error("Unable to load user");

  const data = await res.json();
  if (!data.data?.data) throw new Error("Invalid user response");
  return { status: "success", user: data.data.data };
};

export async function getLoggedInUserResult() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) return { status: "unauthenticated" };

  try {
    return await getUser(jwt);
  } catch {
    return { status: "error" };
  }
}

export async function getLoggedInUser() {
  const result = await getLoggedInUserResult();
  return result.status === "success" ? result.user : null;
}

async function getAccountData(path, jwt) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}${path}`, {
      headers: { Cookie: `jwt=${jwt}` },
    });
    if (response.status === 401) return { status: "unauthenticated" };
    if (!response.ok) return { status: "error" };

    const body = await response.json();
    if (!Array.isArray(body?.data?.data)) return { status: "error" };

    return { status: "success", body };
  } catch {
    return { status: "error" };
  }
}

export async function getLikedTours() {
  const jwt = (await cookies()).get("jwt")?.value;
  if (!jwt) return { status: "unauthenticated" };
  return getCachedLikedTours(jwt);
}

async function getCachedLikedTours(jwt) {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag(getUserCacheTag(jwt));
  const result = await getAccountData("api/v1/users/liked-tours", jwt);

  return result.status === "success"
    ? { status: "success", tours: result.body.data.data }
    : result;
}

async function getPaginatedAccountData(resource, page) {
  const jwt = (await cookies()).get("jwt")?.value;
  if (!jwt) return { status: "unauthenticated" };
  const result = await getAccountData(
    `api/v1/users/${resource}?page=${page}`,
    jwt,
  );
  if (result.status !== "success") return result;
  if (!result.body.pagination) return { status: "error" };

  return {
    status: "success",
    data: result.body.data.data,
    pagination: result.body.pagination,
  };
}

export async function getMyBookings(page) {
  const result = await getPaginatedAccountData("bookings", page);
  return result.status === "success"
    ? {
        status: "success",
        bookings: result.data,
        pagination: result.pagination,
      }
    : result;
}

export async function getMyReviews(page) {
  const result = await getPaginatedAccountData("reviews", page);
  return result.status === "success"
    ? { status: "success", reviews: result.data, pagination: result.pagination }
    : result;
}

export async function getAdminReviews(query, page) {
  const jwt = (await cookies()).get("jwt")?.value;
  if (!jwt) return { status: "unauthenticated" };

  const params = new URLSearchParams({ page: String(page), limit: "10" });
  if (query) params.set("query", query);

  try {
    const response = await fetch(
      `${process.env.SERVER_URL}api/v1/reviews/admin?${params}`,
      {
        headers: { Cookie: `jwt=${jwt}` },
      },
    );
    if (response.status === 401) return { status: "unauthenticated" };
    if (response.status === 403) return { status: "forbidden" };
    if (!response.ok) return { status: "error" };

    const body = await response.json();
    if (!Array.isArray(body?.data?.data) || !body.pagination)
      return { status: "error" };

    return {
      status: "success",
      reviews: body.data.data,
      pagination: body.pagination,
    };
  } catch {
    return { status: "error" };
  }
}

export async function deleteAdminReview(formData) {
  "use server";

  const jwt = (await cookies()).get("jwt")?.value;
  if (!jwt) redirect("/login");

  const reviewId = String(formData.get("reviewId") || "");
  const tourSlug = String(formData.get("tourSlug") || "");
  const query = String(formData.get("query") || "").trim();
  const requestedPage = Number(formData.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (page > 1) params.set("page", String(page));

  let error;
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}api/v1/reviews/${encodeURIComponent(reviewId)}`,
      { method: "DELETE", headers: { Cookie: `jwt=${jwt}` } },
    );
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      error = body?.message || "Unable to delete review";
    }
  } catch {
    error = serviceError;
  }

  if (error) {
    params.set("error", error);
  } else {
    updateTag("tours");
    if (tourSlug) updateTag(getTourCacheTag(tourSlug));
    params.set("success", "Review deleted successfully");
  }

  redirect(`/me/admin/manage-reviews?${params}`);
}

export async function getTourBySlug(slug) {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
  cacheTag(getTourCacheTag(slug));
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}api/v1/tours/slug/${slug}`,
    );
    if (res.status === 404) return { status: "not-found" };
    if (!res.ok) return { status: "error" };

    const data = await res.json();
    if (data.status !== "success" || !data.data?.data)
      return { status: "error" };

    return { status: "success", tour: data.data.data };
  } catch {
    return { status: "error" };
  }
}

export async function getPersonalTourBySlug(slug, jwt) {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}api/v1/tours/slug/${slug}`,
      {
        headers: { Cookie: `jwt=${jwt}` },
      },
    );
    if (!res.ok) return { status: "error" };
    const data = await res.json();
    return data.status === "success" && data.data?.data
      ? { status: "success", tour: data.data.data }
      : { status: "error" };
  } catch {
    return { status: "error" };
  }
}

export async function setLikedTour(tourId, shouldLike) {
  "use server";

  const jwt = (await cookies()).get("jwt")?.value;
  if (!jwt) return false;

  try {
    const res = await fetch(
      `${process.env.SERVER_URL}api/v1/users/liked-tours/${tourId}`,
      {
        method: shouldLike ? "POST" : "DELETE",
        headers: { Cookie: `jwt=${jwt}` },
      },
    );
    const data = await res.json();

    if (
      !res.ok ||
      data.status !== "success" ||
      data.data.likedTours.includes(tourId) !== shouldLike
    )
      return false;

    updateTag(getUserCacheTag(jwt));
    return true;
  } catch {
    return false;
  }
}

export async function login(formData) {
  "use server";

  const result = await requestJson(
    `${process.env.SERVER_URL}api/v1/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    },
  );

  if (!result) redirect(`/login?error=${encodeURIComponent(serviceError)}`);
  const { response, data } = result;

  if (!response.ok || data.status !== "success") {
    redirect(
      `/login?error=${encodeURIComponent(data.message || "Unable to log in")}`,
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("jwt", data.token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect("/");
}

export async function signup(formData) {
  "use server";

  const result = await requestJson(
    `${process.env.SERVER_URL}api/v1/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
      }),
    },
  );
  if (!result) redirect(`/signup?error=${encodeURIComponent(serviceError)}`);
  const { response, data } = result;

  if (!response.ok || data.status !== "success") {
    redirect(
      `/signup?error=${encodeURIComponent(data.message || "Unable to create your account. Please try again.")}`,
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("jwt", data.token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect("/");
}

export async function updateAccountSettings(formData) {
  "use server";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  if (!jwt) redirect("/login");

  const body = new FormData();

  body.append("name", formData.get("name"));
  body.append("email", formData.get("email"));
  if (formData.get("photo").type.startsWith("image"))
    body.append("photo", formData.get("photo"));

  const result = await requestJson(
    `${process.env.SERVER_URL}api/v1/users/updateMe`,
    {
      method: "PATCH",
      headers: {
        Cookie: `jwt=${jwt}`,
      },
      body,
    },
  );

  if (!result) redirect(`/me?error=${encodeURIComponent(serviceError)}`);
  const { response, data } = result;
  if (!response.ok || data.status !== "success")
    redirect(
      `/me?error=${encodeURIComponent(data.message || "Unable to save settings")}`,
    );

  updateTag(getUserCacheTag(jwt));
  redirect("/me");
}

export async function updatePassword(formData) {
  "use server";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  if (!jwt) redirect("/login");

  const result = await requestJson(
    `${process.env.SERVER_URL}api/v1/users/updateMyPassword`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${jwt}`,
      },
      body: JSON.stringify({
        passwordCurrent: formData.get("passwordCurrent"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
      }),
    },
  );

  if (!result)
    redirect(`/me?errorPassword=${encodeURIComponent(serviceError)}`);
  const { response, data } = result;

  if (!response.ok || data.status !== "success") {
    redirect(
      `/me?errorPassword=${encodeURIComponent(data.message || "Unable to update password")}`,
    );
  }

  updateTag(getUserCacheTag(jwt));

  cookieStore.set("jwt", data.token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect(`/me?successPassword=Password successfully changed`);
}

export async function logout() {
  "use server";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (jwt) updateTag(getUserCacheTag(jwt));

  cookieStore.delete("jwt");
}

export async function createCheckoutSession(
  _previousState,
  { tourId, bookedDate },
) {
  "use server";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  if (!jwt || !tourId || !bookedDate) redirect("/login");

  const result = await requestJson(
    `${process.env.SERVER_URL}api/v1/bookings/checkout-session/${tourId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `jwt=${jwt}` },
      body: JSON.stringify({ bookedDate }),
    },
  );
  if (!result) return { error: serviceError };
  const { response, data } = result;

  if (!response.ok || data.status !== "success" || !data.session?.url)
    return { error: data.message || "Unable to start checkout" };

  redirect(data.session.url);
}

export async function createReview(formData) {
  "use server";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const tourId = formData.get("tourId");
  const slug = formData.get("slug");

  if (!jwt) redirect("/login");

  const result = await requestJson(
    `${process.env.SERVER_URL}api/v1/tours/${tourId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${jwt}`,
      },
      body: JSON.stringify({
        review: formData.get("review"),
        rating: Number(formData.get("rating")),
      }),
    },
  );
  if (!result)
    redirect(`/tour/${slug}?reviewError=${encodeURIComponent(serviceError)}`);
  const { response, data } = result;

  if (!response.ok || data.status !== "success")
    redirect(
      `/tour/${slug}?reviewError=${encodeURIComponent(data.message || "Unable to submit review")}`,
    );

  updateTag(getTourCacheTag(slug));
  updateTag("tours");
  redirect(`/tour/${slug}?reviewSuccess=1`);
}
