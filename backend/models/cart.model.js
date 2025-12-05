import mongoose from "mongoose";

export const itemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [itemsSchema],
  totalAmount: {
    type: Number,
    required: true,
  }
},{timestamps:true});

export default mongoose.model("Cart", cartSchema);