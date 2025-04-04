import mongoose, { Document, Types } from "mongoose";

interface Review {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

interface Variant {
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
}

interface Product extends Document {
  name: string;
  description: string;
  category: string;
  variants: Variant[];
  ratings: number;
  reviews: Review[];
  seller: Types.ObjectId;
}

const reviewSchema = new mongoose.Schema<Review>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

const variantSchema = new mongoose.Schema<Variant>(
  {
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    variants: { type: [variantSchema], required: true },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [reviewSchema],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);
