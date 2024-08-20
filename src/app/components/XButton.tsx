import React from "react";

type Props = {
  remove: (index: number) => void;
  index: number;
};

const XButton = ({ remove, index }: Props) => {
  return (
    <div
      className="relative h-16 top-1/3 left-1/3 aspect-square hover:scale-105 hover:cursor-pointer transition-all"
      onClick={() => remove(index)}
    >
      <div className=" bg-slate-100 h-2 w-8 rotate-45"></div>
      <div className="absolute bg-slate-100 h-2 w-8 top-0 left-0 -rotate-45"></div>
    </div>
  );
};

export default XButton;
