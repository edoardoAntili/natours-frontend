import "./_styles/tailwind.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

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
      <body className="flex min-h-screen flex-col p-12 font-[Lato,sans-serif] text-[#777] font-light leading-[1.6] selection:bg-[#55c57a] selection:text-white">
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
