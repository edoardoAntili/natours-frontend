import Link from "next/link";
import ActiveAccountLink from "./ActiveAccountLink";

function NavItem({ href, text, icon }) {
  return (
    <li>
      <Link href={href}>
        <svg>
          <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
        </svg>

        {text}
      </Link>
    </li>
  );
}

export default function AccountNav({ role }) {
  return (
    <nav className="min-w-0 shrink-0 lg:basis-[26rem] xl:basis-[32rem] [background-image:linear-gradient(to_right_bottom,_#7dd56f,_#28b487)] py-4 px-0 lg:py-16">
      <ul className="grid grid-cols-2 list-none lg:block [&_li]:[border-left:0_solid_#fff] [&_li]:transition-all [&_li]:ease-[ease] [&_li]:duration-300 [&_li]:my-4 [&_li]:mx-0 [&_li:hover]:[border-left:4px_solid_#fff]! [&_a]:flex [&_a]:items-center [&_a]:text-white [&_a]:text-[1.5rem] [&_a]:uppercase [&_a]:font-normal [&_a]:no-underline [&_a]:transition-all [&_a]:ease-[ease] [&_a]:duration-300 [&_a]:py-4 [&_a]:px-6 sm:[&_a]:px-10 lg:[&_a]:px-12 xl:[&_a]:px-16 [&_a:hover]:[transform:translateX(3px)] [&_a:active]:[transform:translateX(3px)] [&_svg]:h-[1.9rem] [&_svg]:w-[1.9rem] [&_svg]:fill-[#f7f7f7] [&_svg]:mr-4 [&_svg]:shrink-0 lg:[&_svg]:mr-8">
        <ActiveAccountLink
          href="/me"
          text="Settings"
          icon="settings"
          segment={null}
        />

        {role === "user" && (
          <>
            <ActiveAccountLink
              href="/me/bookings"
              text="My bookings"
              icon="briefcase"
              segment="bookings"
            />

            <ActiveAccountLink
              href="/me/reviews"
              text="My reviews"
              icon="star"
              segment="reviews"
            />
          </>
        )}

        <ActiveAccountLink
          href="/me/likes"
          text="My likes"
          icon="heart"
          segment="likes"
        />
      </ul>

      {role === "admin" && (
        <div className="mt-6 lg:mt-22">
          <h5 className="font-bold text-[1.2rem] uppercase text-[#f2f2f2] [border-bottom:1px_solid_currentColor] mt-0 mr-20 mb-6 ml-16 pb-[3px]">
            Admin
          </h5>

          <ul className="grid grid-cols-2 list-none lg:block [&_li]:[border-left:0_solid_#fff] [&_li]:transition-all [&_li]:ease-[ease] [&_li]:duration-300 [&_li]:my-4 [&_li]:mx-0 [&_li:hover]:[border-left:4px_solid_#fff]! [&_a]:flex [&_a]:items-center [&_a]:text-white [&_a]:text-[1.5rem] [&_a]:uppercase [&_a]:font-normal [&_a]:no-underline [&_a]:transition-all [&_a]:ease-[ease] [&_a]:duration-300 [&_a]:py-4 [&_a]:px-6 sm:[&_a]:px-10 lg:[&_a]:px-12 xl:[&_a]:px-16 [&_a:hover]:[transform:translateX(3px)] [&_a:active]:[transform:translateX(3px)] [&_svg]:h-[1.9rem] [&_svg]:w-[1.9rem] [&_svg]:fill-[#f7f7f7] [&_svg]:mr-4 [&_svg]:shrink-0 lg:[&_svg]:mr-8">
            <NavItem href="#" text="Manage tours" icon="map" />

            <NavItem href="#" text="Manage users" icon="users" />

            <ActiveAccountLink
              href="/me/admin/manage-reviews"
              text="Manage reviews"
              icon="star"
              segment="admin"
            />

            <NavItem href="#" text="Manage bookings" icon="briefcase" />
          </ul>
        </div>
      )}
    </nav>
  );
}
