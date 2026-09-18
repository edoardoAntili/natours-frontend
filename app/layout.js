import { Lato } from "next/font/google";
import "./_styles/tailwind.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "Natours | %s",
    default: "Natours",
  },
  description: "Exciting tours for adventurous people",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="box-border text-[62.5%]">
      <body
        className={`${lato.className} flex min-h-screen flex-col p-0 sm:p-6 lg:p-12 text-[#777] font-light leading-[1.6] selection:bg-[#55c57a] selection:text-white`}
      >
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
