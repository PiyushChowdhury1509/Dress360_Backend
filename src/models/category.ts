import mongoose, { Document, Types } from "mongoose";

interface Category extends Document {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent?: Types.ObjectId;
    isActive: boolean;
}

const categorySchema = new mongoose.Schema<Category>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "", 
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model<Category>("Category", categorySchema);
