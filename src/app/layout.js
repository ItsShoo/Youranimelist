import { Gabarito } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata = {
  title: "AnimeList",
  description: "Website anime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gabarito.className} bg-color-dark`}>
        <NavBar/>
        {children}</body>
    </html>
  );
}
