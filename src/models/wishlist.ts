import mongoose, { Document, Types } from "mongoose";

interface Wishlist extends Document {
    user: Types.ObjectId;
    products: Types.ObjectId[];
}

const wishlistSchema = new mongoose.Schema<Wishlist>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, 
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                unique: true, 
            },
        ],
    },
    { timestamps: true }
);

export const Wishlist = mongoose.models.Wishlist || mongoose.model<Wishlist>("Wishlist", wishlistSchema);
