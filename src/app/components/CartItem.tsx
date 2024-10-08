import React from "react";
import { ProductData } from "../types";
import XButton from "./XButton";

type Props = {
  remove: (index: number) => void;
  index: number;
  productData: ProductData;
};

const CartItem = ({ productData, remove, index }: Props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-1 bg-slate-600 w-[30vw] h-full p-4 rounded-2xl">
      <div className="flex flex-col justify-center">
        <p className="text-xl">{productData.title}</p>
      </div>
      <div className="grid grid-cols-2 self-end">
        <p className="flex justify-end items-center text-xl text-right">
          ${productData.price}
        </p>
        <div className="flex justify-center items-centerplace-self-end">
          <XButton remove={remove} index={index} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
