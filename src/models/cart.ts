import mongoose, { Document, Types } from "mongoose";

interface CartItem {
  product: Types.ObjectId;
  variantId?: string;
  quantity: number;
}

export interface Cart extends Document {
  user: Types.ObjectId;
  items: CartItem[];
}

const cartItemSchema = new mongoose.Schema<CartItem>(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: String }, 
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema<Cart>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model<Cart>("Cart", cartSchema);
