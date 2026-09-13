import Link from "next/link";

function NavItem({ href, text, icon, active = false }) {
  return (
    <li className={active ? "side-nav--active" : ""}>
      <Link href={href}>
        <svg>
          <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
        </svg>

        {text}
      </Link>
    </li>
  );
}

export default function AccountNav({ user }) {
  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <NavItem href="/account" text="Settings" icon="settings" active />

        <NavItem href="#" text="My bookings" icon="briefcase" />

        <NavItem href="#" text="My reviews" icon="star" />

        <NavItem href="#" text="Billing" icon="credit-card" />
      </ul>

      {user.role === "admin" && (
        <div className="admin-nav">
          <h5 className="admin-nav__heading">Admin</h5>

          <ul className="side-nav">
            <NavItem href="#" text="Manage tours" icon="map" />

            <NavItem href="#" text="Manage users" icon="users" />

            <NavItem href="#" text="Manage reviews" icon="star" />

            <NavItem href="#" text="Manage bookings" icon="briefcase" />
          </ul>
        </div>
      )}
    </nav>
  );
}
