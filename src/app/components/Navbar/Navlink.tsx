import { linkNames, NavLink } from "@/app/types";
import React from "react";

const Navlink = ({ linkName, linkHref }: NavLink) => {
  return (
    <div className="relative">
      <a className="text-[28px]" href={linkHref}>
        {linkName}
      </a>
      {linkName === linkNames.cart && (
        <div className="absolute flex justify-center items-center -top-4 -right-8 w-2 h-2 p-4 aspect-square bg-slate-600 rounded-full">
          <p>1</p>
        </div>
      )}
    </div>
  );
};

export default Navlink;
