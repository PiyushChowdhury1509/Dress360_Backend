import mongoose, { Document, Types } from "mongoose";

interface OrderItem {
  product: Types.ObjectId;
  variant: {
    color: string;
    size: string;
  };
  quantity: number;
  price: number;
}

interface Order extends Document {
  user: Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "COD" | "Card" | "UPI" | "PayPal";
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
}

const orderItemSchema = new mongoose.Schema<OrderItem>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variant: {
      color: { type: String, required: true },
      size: { type: String, required: true },
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema<Order>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["COD", "Card", "UPI", "PayPal"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<Order>("Order", orderSchema);
