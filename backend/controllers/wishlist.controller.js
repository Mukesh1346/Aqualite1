import { Wishlist } from "../models/wishlist.model.js";

const createWishlist = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const wishlist = await Wishlist.findOne({ user: _id });
    if (wishlist) {
      const alreadyExists = wishlist.products.includes(productId);
      if (!alreadyExists) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    } else {
      await Wishlist.create({ productId: [productId], user: _id });
    }
    return res.status(201).json({ message: "Wishlist created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllWishlists = async (req, res) => {
  try {
    if(!req?.user?._id){
      return res.status(400).json({ message: "You are not logged in" });
    }
    const wishlists = await Wishlist.findOne({ user: req?.user?._id }).populate("products");
    return res.status(200).json({ message: "All wishlists", wishlists });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteWishlist=async(req,res)=>{
  try {
    if(!req?.user?._id){
      return res.status(400).json({ message: "You are not logged in" });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const wishlist = await Wishlist.findOneAndUpdate({ user: req?.user?._id }, { $pull: { products: id } }, { new: true });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    return res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

export { createWishlist,getAllWishlists,deleteWishlist };
