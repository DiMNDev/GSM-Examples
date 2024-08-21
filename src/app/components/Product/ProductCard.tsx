"use client";
import { useAppContext } from "@/app/context/ContextProvider";
import { ProductData } from "@/app/types";
import React from "react";

const ProductCard = (productData: ProductData) => {
  const { addToCart } = useAppContext();
  return (
    <div className="relative flex flex-col justify-center items-center gap-4 w-[30rem] h-full rounded-2xl p-4 bg-slate-700">
      <div className="flex flex-col justify-center items-center h-[20rem] w-[15rem] bg-slate-600">
        {productData.image}
      </div>
      {productData.featured && (
        <div className="absolute top-4 left-4 text-yellow-500 text-5xl -rotate-12">
          &#10026;
        </div>
      )}
      <h1>{productData.title}</h1>
      <p className="text-center">{productData.description}</p>
      <div>${productData.price}</div>
      <button
        className="bg-slate-800 p-4 hover:scale-105 transition-all rounded-xl"
        onClick={() =>
          addToCart(
            {
              title: productData.title,
              image: productData.image,
              description: productData.description,
              price: productData.price,
              featured: productData.featured,
            },
            1
          )
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
