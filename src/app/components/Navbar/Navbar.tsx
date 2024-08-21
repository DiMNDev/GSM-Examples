"use client";
import React, { useEffect, useState } from "react";
import Navlink from "./Navlink";
import { NavLinks } from "@/app/types";
import WelcomeMessage from "./WelcomeMessage";
import jwt from "jsonwebtoken";
import { useAppContext } from "@/app/context/ContextProvider";

type Props = {
  NavLinkData: NavLinks;
};

const Navbar = ({ NavLinkData }: Props) => {
  const { userInfo } = useAppContext();
  return (
    <div className="flex justify-between p-6">
      <div className="text-[48px]">LOGO</div>
      <WelcomeMessage username={userInfo.username} />
      <div className="flex justify-around items-center w-[30vw]">
        {NavLinkData.map((link) => (
          <Navlink
            key={link.linkName}
            linkData={link}
            loggedIn={userInfo.loggedIn}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
