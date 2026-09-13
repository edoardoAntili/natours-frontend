import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Image
          src="/img/logo-green.png"
          alt="Natours logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "auto",
            height: "3rem",
          }}
        />
      </div>

      <ul className="footer__nav">
        <li>
          <Link href="#">About us</Link>
        </li>

        <li>
          <Link href="#">Download apps</Link>
        </li>

        <li>
          <Link href="#">Become a guide</Link>
        </li>

        <li>
          <Link href="#">Careers</Link>
        </li>

        <li>
          <Link href="#">Contact</Link>
        </li>
      </ul>

      <p className="footer__copyright">&copy; by Jonas Schmedtmann.</p>
    </footer>
  );
}

export default Footer;
