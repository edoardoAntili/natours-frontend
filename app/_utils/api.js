import { createHash } from "node:crypto";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

const getUserCacheTag = (jwt) =>
  `user:${createHash("sha256").update(jwt).digest("hex")}`;

const getTourCacheTag = (slug, jwt) =>
  `tour:${slug}:${jwt ? getUserCacheTag(jwt) : "anonymous"}`;

export async function getAllTours() {
  "use cache";
  const res = await fetch(`${process.env.SERVER_URL}api/v1/tours`);
  const data = await res.json();

  if (data.status !== "success") return notFound();

  return data.data.data;
}

const getUser = async function (jwt) {
  const res = await fetch(`${process.env.SERVER_URL}api/v1/users/me`, {
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 300,
      tags: [getUserCacheTag(jwt)],
    },
  });
  const data = await res.json();

  if (data.status !== "success") return null;

  return data.data.data;
};

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) return null;

  return getUser(jwt);
}

export async function getLikedTours() {
  const jwt = (await cookies()).get("jwt")?.value;
  if (!jwt) return null;

  const res = await fetch(`${process.env.SERVER_URL}api/v1/users/liked-tours`, {
    headers: { Cookie: `jwt=${jwt}` },
    cache: "force-cache",
    next: {
      revalidate: 300,
      tags: [getUserCacheTag(jwt)],
    },
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Unable to load liked tours");

  const data = await res.json();
  if (data.status !== "success") throw new Error("Unable to load liked tours");

  return data.data.data;
}

export async function getTourBySlug(slug, jwt) {
  const res = await fetch(
    `${process.env.SERVER_URL}api/v1/tours/slug/${slug}`,
    {
      headers: jwt ? { Cookie: `jwt=${jwt}` } : {},
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: [getTourCacheTag(slug, jwt)],
      },
    },
  );
  const data = await res.json();

  if (data.status !== "success") return notFound();

  return data.data.data;
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

  const res = await fetch(`${process.env.SERVER_URL}api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  const data = await res.json();

  if (data.status !== "success") {
    redirect(`/login?error=${data.message}`);
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

  const res = await fetch(`${process.env.SERVER_URL}api/v1/users/signup`, {
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
  });
  console.log(res);

  const data = await res.json();

  if (data.status !== "success") {
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
  const jwt = cookieStore.get("jwt").value;

  const body = new FormData();

  body.append("name", formData.get("name"));
  body.append("email", formData.get("email"));
  if (formData.get("photo").type.startsWith("image"))
    body.append("photo", formData.get("photo"));

  const res = await fetch(`${process.env.SERVER_URL}api/v1/users/updateMe`, {
    method: "PATCH",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    body,
  });

  const data = await res.json();

  // To see
  // if (data.status !== "success") {
  //   redirect(`/me?error=${data.message}`);
  // }

  updateTag(getUserCacheTag(jwt));
  redirect("/me");
}

export async function updatePassword(formData) {
  "use server";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt").value;

  const res = await fetch(
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

  const data = await res.json();

  if (data.status !== "success") {
    redirect(`/me?errorPassword=${data.message}`);
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

  redirect("/");
}

export async function createCheckoutSession(
  _previousState,
  { tourId, bookedDate },
) {
  "use server";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  if (!jwt || !tourId || !bookedDate) redirect("/login");

  const res = await fetch(
    `${process.env.SERVER_URL}api/v1/bookings/checkout-session/${tourId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `jwt=${jwt}` },
      body: JSON.stringify({ bookedDate }),
    },
  );
  const data = await res.json();

  if (data.status !== "success" || !data.session?.url)
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

  const res = await fetch(
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
  const data = await res.json();

  if (data.status !== "success")
    redirect(
      `/tour/${slug}?reviewError=${encodeURIComponent(data.message || "Unable to submit review")}`,
    );

  updateTag(getTourCacheTag(slug, jwt));
  redirect(`/tour/${slug}?reviewSuccess=1`);
}
