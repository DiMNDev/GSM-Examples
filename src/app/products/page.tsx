"use client";
import React from "react";
import ProductCard from "../components/Product/ProductCard";
import { ProductData } from "../types";
import { useAppContext } from "../context/ContextProvider";

type Props = {};

const Products = (props: Props) => {
  const { FeaturedProducts, Products } = useAppContext();
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center gap-10">
        <div className="flex flex-col justify-center items-center gap-6 w-[100vw]">
          <h1 className="text-4xl">Everything but the Holy Grail</h1>
          <div className="flex justify-around w-[60vw]">
            {FeaturedProducts?.map((product: ProductData) => (
              <div key={product.title}>
                <ProductCard
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  price={product.price}
                  featured={product.featured}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-around flex-wrap">
          {Products?.map((product: ProductData) => (
            <div key={product.title}>
              <ProductCard
                title={product.title}
                image={product.image}
                description={product.description}
                price={product.price}
                featured={product.featured}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
