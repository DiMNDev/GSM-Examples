"use client";
import React, { useEffect, useState } from "react";
import { ProductData } from "../types";
import CartItem from "../components/CartItem";

type Props = {};

const Cart = (props: Props) => {
  const [cartItems, setCartItems] = useState<ProductData[]>();
  const getItemsFromLocalStorage = () => {
    const data = localStorage.getItem("cart");
    const parsedItems = data ? JSON.parse(data) : null;
    parsedItems ? setCartItems(parsedItems) : setCartItems(undefined);
  };
  const removeCartItem = (index: number) => {
    setCartItems((prev) => prev?.filter((item) => item !== prev[index]));
    console.log("removed");
  };
  const updateLocalStorage = () => {
    const data = JSON.stringify(cartItems);
    localStorage.setItem("cart", data);
    console.log("updated");
  };

  useEffect(() => {
    if (cartItems !== undefined) {
      updateLocalStorage();
    }
    // Don't create an infinite loop
  }, [removeCartItem]);
  useEffect(() => {
    getItemsFromLocalStorage();
  }, []);
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl">Cart</h1>
        {cartItems?.map((item, index) => (
          // Don't use index as key
          <div key={index}>
            <CartItem
              remove={removeCartItem}
              productData={item}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
