import { cacheTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function getAllTours() {
  "use cache";
  const res = await fetch(`${process.env.SERVER_URL}api/v1/tours`);
  const data = await res.json();

  if (data.status !== "success") return notFound();

  return data.data.data;
}

const getUser = async function (jwt) {
  "use cache";
  cacheTag("user");
  const res = await fetch(`${process.env.SERVER_URL}api/v1/users/me`, {
    headers: {
      Cookie: `jwt=${jwt}`,
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

export async function getTourBySlug(slug) {
  "use cache";
  const res = await fetch(`${process.env.SERVER_URL}api/v1/tours/slug/${slug}`);
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

  updateTag("user");
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
  cookieStore.delete("jwt");

  redirect("/");
}
