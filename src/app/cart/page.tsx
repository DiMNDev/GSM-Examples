"use client";
import React from "react";
import CartItem from "../components/CartItem";
import { useAppContext } from "../context/ContextProvider";

type Props = {};

const Cart = (props: Props) => {
  const { cartItems } = useAppContext();
  console.log(cartItems);
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl">Cart</h1>
        {cartItems.map((item, index) => (
          // Don't use index as key
          <div key={index}>
            <CartItem productData={item.product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
