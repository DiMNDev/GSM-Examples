import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { NavLinks, linkNames, linkRefs } from "./types";
import { ContextProvider } from "./context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prop-Drilling & LocalStorage",
  description: "There is a better way",
};
const NavLinkData: NavLinks = [
  {
    linkName: linkNames.home,
    linkHref: linkRefs.home,
  },
  {
    linkName: linkNames.products,
    linkHref: linkRefs.products,
  },
  {
    linkName: linkNames.cart,
    linkHref: linkRefs.cart,
  },
  {
    linkName: linkNames.login,
    linkHref: linkRefs.login,
  },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <Navbar NavLinkData={NavLinkData} />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
