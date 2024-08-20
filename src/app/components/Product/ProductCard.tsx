"use client";
import { ProductData } from "@/app/types";
import React from "react";

const ProductCard = ({
  title,
  image,
  description,
  price,
  featured,
}: ProductData) => {
  const addItemToCart = () => {
    const newItem = {
      title: title,
      image: image,
      description: description,
      price: price,
      featured: featured,
    };
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
    const localCart = localStorage.getItem("cart");
    const parsedCart = localCart ? JSON.parse(localCart) : "";
    const itemArray = parsedCart;
    itemArray.push(newItem);
    const newCartData = itemArray;
    const JSONData = JSON.stringify(newCartData);
    localStorage.setItem("cart", JSONData);
    console.log("added");
  };
  return (
    <div className="relative flex flex-col justify-center items-center gap-4 w-[30rem] h-full rounded-2xl p-4 bg-slate-700">
      <div className="flex flex-col justify-center items-center h-[20rem] w-[15rem] bg-slate-600">
        {image}
      </div>
      {featured && (
        <div className="absolute top-4 left-4 text-yellow-500 text-5xl -rotate-12">
          &#10026;
        </div>
      )}
      <h1>{title}</h1>
      <p className="text-center">{description}</p>
      <div>${price}</div>
      <button
        className="bg-slate-800 p-4 hover:scale-105 transition-all rounded-xl"
        onClick={() => addItemToCart()}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
