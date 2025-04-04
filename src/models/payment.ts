import mongoose, { Document, Types } from "mongoose";

interface Payment extends Document {
    user: Types.ObjectId;
    order: Types.ObjectId;
    paymentId: string;
    paymentMethod: "COD" | "Razorpay" | "Stripe" | "PayPal" | "UPI";
    status: "Pending" | "Completed" | "Failed" | "Refunded";
    amountPaid: number;
    currency: string;
    providerOrderId?: string; // Razorpay or Stripe order ID
    paidAt?: Date;
}

const paymentSchema = new mongoose.Schema<Payment>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },

        paymentId: { type: String, required: true }, // Razorpay/Stripe/PayPal ID
        providerOrderId: { type: String },           // Razorpay order ID or Stripe session ID

        paymentMethod: {
            type: String,
            enum: ["COD", "Razorpay", "Stripe", "PayPal", "UPI"],
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Completed", "Failed", "Refunded"],
            default: "Pending",
        },

        amountPaid: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "INR" },
        paidAt: { type: Date },
    },
    { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model<Payment>("Payment", paymentSchema);
