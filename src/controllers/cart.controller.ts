import { Request, Response } from "express";
import { Cart } from "../models/cart";
import { Product } from "../models/product";

export const createCart = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid cart data" });
    }

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
    }

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items } },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, cart });
    return;
  } catch (err) {
    console.error("Create cart error:", err);
    res.status(500).json({ success: false, message: "Failed to create cart" });
    return;
  }
};
