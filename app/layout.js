import "./_styles/globals.css";
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
    <html lang="en">
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
