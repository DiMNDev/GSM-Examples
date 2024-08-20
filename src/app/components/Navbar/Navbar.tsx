"use client";
import React, { useEffect, useState } from "react";
import Navlink from "./Navlink";
import { NavLinks } from "@/app/types";
import WelcomeMessage from "./WelcomeMessage";
import jwt from "jsonwebtoken";

type Props = {
  NavLinkData: NavLinks;
};

const Navbar = ({ NavLinkData }: Props) => {
  const [username, setUsername] = useState<string>("Wut?");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const getUsername = () => {
    const token = localStorage.getItem("user");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    const decodeToken = token ? jwt.decode(token) : null;
    const newUsername =
      decodeToken !== null ? Object(decodeToken).userName : "Guest";
    setUsername(newUsername);
  };
  useEffect(() => {
    getUsername();
  }, []);
  return (
    <div className="flex justify-between p-6">
      <div className="text-[48px]">LOGO</div>
      <WelcomeMessage username={username} />
      <div className="flex justify-around items-center w-[30vw]">
        {NavLinkData.map((link) => (
          <Navlink key={link.linkName} linkData={link} loggedIn={loggedIn} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
