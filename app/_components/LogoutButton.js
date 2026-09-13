import { logout } from "../_utils/api";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="nav__el nav__el--logout">
        Log out
      </button>
    </form>
  );
}
