import Link from "next/link";
import Image from "next/image";
import { getLoggedInUser } from "../_utils/api";
import LogoutButton from "./LogoutButton";

async function UserNav() {
  const user = await getLoggedInUser();

  return user ? (
    <>
      {/* <Link href="#" className="nav__el nav__el--logout">
        Log out
      </Link> */}
      <LogoutButton />

      <Link href="/me" className="nav__el">
        <Image
          className="nav__user-img"
          src={`/img/users/${user.photo}`}
          alt={`Photo of ${user.name}`}
          width={32}
          height={32}
        />

        <span>{user.name.split(" ")[0]}</span>
      </Link>
    </>
  ) : (
    <>
      <Link href="/login" className="nav__el">
        Log in
      </Link>

      <Link href="#" className="nav__el nav__el--cta">
        Sign up
      </Link>
    </>
  );
}

export default UserNav;
