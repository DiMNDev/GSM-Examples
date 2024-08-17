import React from "react";
import Navlink from "./Navlink";
import { linkNames, linkRefs, NavLinks } from "@/app/types";

type Props = {};

const Navbar = (props: Props) => {
  const NavLinks: NavLinks = [
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
  return (
    <div className="flex justify-between p-6">
      <div className="text-[48px]">LOGO</div>
      <div className="flex justify-around items-center w-[30vw]">
        {NavLinks.map((link) => (
          <Navlink
            key={link.linkName}
            linkName={link.linkName}
            linkHref={link.linkHref}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
