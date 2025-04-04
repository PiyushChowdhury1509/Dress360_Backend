import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      category,
      variants,
      seller 
    } = req.body;

    if (!name || !description || !category || !variants || !seller) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      res.status(400).json({ message: "Variants must be a non-empty array." });
      return;
    }

    const product = await Product.create({
      name,
      description,
      category,
      variants,
      seller
    });

    res.status(201).json({
      success: true,
      product
    });
    return;

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product."
    });
    return;
  }
};

import { Product } from "../models/product";

export const getProductFeed = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const keyword = (req.query.search as string) || "";
      const category = (req.query.category as string) || "";
  
      const filter: Record<string, any> = {};
  
      if (keyword) {
        filter.name = { $regex: keyword, $options: "i" };
      }
  
      if (category) {
        filter.category = category;
      }
  
      const total = await Product.countDocuments(filter);
  
      const products = await Product.find(filter)
        .populate("seller", "name")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.status(200).json({
        success: true,
        total,
        page,
        pages: Math.ceil(total / limit),
        products,
      });
    } catch (err) {
      console.error("Error fetching product feed:", err);
      res.status(500).json({
        success: false,
        message: "Error fetching product feed",
      });
    }
  };