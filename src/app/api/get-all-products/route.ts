// Get All Products Logic

import connectDB from "@/app/db/connectDB";
import dbErrorHandler from "@/app/db/middleware/dbErrors";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/app/db/models/product";
import { NotFound } from "@/app/errors";
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const allProducts = await Product.find();
    if (!allProducts) {
      throw new NotFound("Oopsey Daisy: Nothing to sell!");
    }
    const featuredProducts = allProducts.filter((product) => product.featured);
    const products = allProducts.filter((product) => !product.featured);
    return NextResponse.json({
      Featured: featuredProducts,
      Products: products,
    });
  } catch (error) {
    return dbErrorHandler(error, req);
  }
}
