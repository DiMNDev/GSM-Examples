"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/Product/ProductCard";
import { ProductData } from "../types";

type Props = {};

const Home = (props: Props) => {
  const [featuredProducts, setFeaturedProducts] = useState<
    ProductData[] | null
  >(null);
  useEffect(() => {
    const loadAllProducts = async () => {
      const endpoint = "/api/get-all-products";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      if (response.status === 200) {
        const productData = await response.json();
        setFeaturedProducts(productData.Featured);
      } else {
        console.log(response);
        return null;
      }
    };
    loadAllProducts();
  }, []);
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center items-center gap-6 w-[100vw]">
        <h1 className="text-4xl">The Holy Grail of Online Shopping</h1>
        <div className="flex justify-around w-[60vw]">
          {featuredProducts !== null ? (
            featuredProducts.map((product: ProductData) => (
              <div key={product.title}>
                <ProductCard
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  price={product.price}
                  featured={product.featured}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-[50vh] w-[100vw]">
              <div className="text-4xl">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
