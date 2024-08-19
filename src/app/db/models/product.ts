import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "WAIT! What are you even selling!?"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Use an image that grabs everyones attention"],
  },
  description: {
    type: String,
    required: [true, "A Product Description is required."],
  },
  price: {
    type: Number,
    required: [true, "Let me guess.. Free?"],
  },
  featured: {
    type: Boolean,
    required: [true, "Featured or Nah?"],
  },
});

let Product;
try {
  Product = mongoose.model("Product");
} catch (error) {
  Product = mongoose.model("Product", ProductSchema);
}

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
