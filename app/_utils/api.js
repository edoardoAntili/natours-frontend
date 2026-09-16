import { createHash } from "node:crypto";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

const getUserCacheTag = (jwt) =>
  `user:${createHash("sha256").update(jwt).digest("hex")}`;

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

export async function getTourBySlug(slug, jwt) {
  "use cache";
  const res = await fetch(
    `${process.env.SERVER_URL}api/v1/tours/slug/${slug}`,
    {
      headers: jwt ? { Cookie: `jwt=${jwt}` } : {},
    },
  );
  const data = await res.json();

  if (data.status !== "success") return notFound();

  return data.data.data;
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
