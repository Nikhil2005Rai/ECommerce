import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, category, new_price, old_price, available } = req.body;

  if (
    [name, category, new_price, old_price, available].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const imageLocalPath = req.file?.path;
  console.log("Image Local Path: ", imageLocalPath);

  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage) {
    throw new ApiError(400, "Image file is required");
  }

  const product = await Product.create({
    name,
    category,
    new_price,
    old_price,
    available,
    image: uploadedImage?.url || "",
  });

  console.log("Product: ", product);

  const createdProduct = await Product.findById(product._id);

  if (!createdProduct) {
    throw new ApiError(400, "Product not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdProduct, "Product created successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  // Ensure the ID is provided
  if (!_id) {
    return res
      .status(400)
      .json(new ApiError(400, null, "Product ID is required"));
  }

  const product = await Product.findByIdAndDelete(
    new mongoose.Types.ObjectId(_id)
  );

  if (!product) {
    return res
      .status(404)
      .json(new ApiError(404, null, "Product not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({})

  return res
  .status(200)
  .json(
    new ApiResponse(200, products, "Products retrieved successfully")
  )
})

export { addProduct, deleteProduct, getAllProducts };
