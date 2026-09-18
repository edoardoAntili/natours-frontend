import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#f7f7f7] text-[1.4rem] grid grid-cols-[auto_auto] gap-y-3 justify-between pt-16 px-8 pb-12 sm:px-16 [@media(max-width:50em)]:grid-cols-[1fr] [@media(max-width:50em)]:gap-y-5 [@media(max-width:50em)]:justify-items-center">
      <div className="row-start-1 row-end-3 self-center [&_img]:h-12 [@media(max-width:50em)]:row-start-1">
        <Image
          className="inline w-auto h-12"
          src="/img/logo-green.png"
          alt="Natours logo"
          width={0}
          height={0}
          sizes="100vw"
          loading="eager"
        />
      </div>

      <p className="text-center justify-self-end text-[#999] [@media(max-width:50em)]:justify-self-center">
        &copy; by Jonas Schmedtmann.
      </p>
    </footer>
  );
}

export default Footer;
