"use client";
import { linkNames, NavLink } from "@/app/types";
import React, { useEffect, useState } from "react";

type Props = {
  linkData: NavLink;
  loggedIn: boolean;
};

const Navlink = ({ linkData, loggedIn }: Props) => {
  const [cartCount, setCartCount] = useState<number>(0);
  useEffect(() => {
    if (linkData.linkName === linkNames.cart) {
      const cartString = localStorage.getItem("cart");
      const parsedString = cartString ? JSON.parse(cartString) : 0;
      const itemCount = parsedString.length;
      if (itemCount) setCartCount(itemCount);
    }
  }, [linkData.linkName]);
  const handleLogout = () => {
    if (loggedIn && linkData.linkName === linkNames.login) {
      localStorage.removeItem("user");
      console.log("logout!");
    }
    console.log("Do nothing");
  };
  return (
    <div className="relative">
      <a
        className={`text-[28px]`}
        href={linkData.linkHref}
        onClick={() => handleLogout()}
      >
        {linkData.linkName === linkNames.login
          ? loggedIn
            ? "Logout"
            : linkData.linkName
          : linkData.linkName}
      </a>
      {linkData.linkName === linkNames.cart && (
        <div className="absolute flex justify-center items-center -top-4 -right-8 w-2 h-2 p-4 aspect-square bg-slate-600 rounded-full">
          <p>{cartCount}</p>
        </div>
      )}
    </div>
  );
};

export default Navlink;
