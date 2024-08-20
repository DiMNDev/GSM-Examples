import React from "react";
import ProductCard from "../components/Product/ProductCard";
import { ProductData } from "../types";

type Props = {};

const Products = async (props: Props) => {
  const loadProducts = async () => {
    const endpoint = "http://localhost:3000/api/get-all-products";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      const productData = await response.json();
      console.log(productData);
      return productData;
    } else {
      console.log(response);
      return null;
    }
  };
  const productData = await loadProducts();
  const FeaturedProducts = productData.Featured;
  const Products = productData.Products;
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center gap-10">
        <div className="flex flex-col justify-center items-center gap-6 w-[100vw]">
          <h1 className="text-4xl">Everything but the Holy Grail</h1>
          <div className="flex justify-around w-[60vw]">
            {FeaturedProducts.map((product: ProductData) => (
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
          {Products.map((product: ProductData) => (
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
