import Link from "next/link";

function NavItem({ href, text, icon, active = false }) {
  return (
    <li
      className={
        active
          ? "[border-left:4px_solid_#fff]! [&_a]:[transform:translateX(-3px)]"
          : ""
      }
    >
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
    <nav className="flex-[32rem_0_0] [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] py-16 px-0">
      <ul className="list-none [&_li]:[border-left:0_solid_#fff] [&_li]:transition-all [&_li]:ease-[ease] [&_li]:duration-300 [&_li]:my-4 [&_li]:mx-0 [&_li:hover]:[border-left:4px_solid_#fff]! [&_a]:flex [&_a]:items-center [&_a]:text-white [&_a]:text-[1.5rem] [&_a]:uppercase [&_a]:font-normal [&_a]:no-underline [&_a]:transition-all [&_a]:ease-[ease] [&_a]:duration-300 [&_a]:py-4 [&_a]:px-16 [&_a:hover]:[transform:translateX(3px)] [&_a:active]:[transform:translateX(3px)] [&_svg]:h-[1.9rem] [&_svg]:w-[1.9rem] [&_svg]:fill-[#f7f7f7] [&_svg]:mr-8">
        <NavItem href="/account" text="Settings" icon="settings" active />

        <NavItem href="#" text="My bookings" icon="briefcase" />

        <NavItem href="#" text="My reviews" icon="star" />

        <NavItem href="#" text="Billing" icon="credit-card" />
      </ul>

      {user.role === "admin" && (
        <div className="mt-22">
          <h5 className="font-bold text-[1.2rem] uppercase text-[#f2f2f2] [border-bottom:1px_solid_currentColor] mt-0 mr-20 mb-6 ml-16 pb-[3px]">
            Admin
          </h5>

          <ul className="list-none [&_li]:[border-left:0_solid_#fff] [&_li]:transition-all [&_li]:ease-[ease] [&_li]:duration-300 [&_li]:my-4 [&_li]:mx-0 [&_li:hover]:[border-left:4px_solid_#fff]! [&_a]:flex [&_a]:items-center [&_a]:text-white [&_a]:text-[1.5rem] [&_a]:uppercase [&_a]:font-normal [&_a]:no-underline [&_a]:transition-all [&_a]:ease-[ease] [&_a]:duration-300 [&_a]:py-4 [&_a]:px-16 [&_a:hover]:[transform:translateX(3px)] [&_a:active]:[transform:translateX(3px)] [&_svg]:h-[1.9rem] [&_svg]:w-[1.9rem] [&_svg]:fill-[#f7f7f7] [&_svg]:mr-8">
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
