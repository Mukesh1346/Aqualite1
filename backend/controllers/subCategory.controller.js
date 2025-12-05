import {uploadOnCloudinary} from "../utils/cloudinary.util.js";
import SubCategory from "../models/subCategory.model.js";
import Product from "../models/product.model.js";
const createSubCategory = async (req, res) => {
  try {
    const { category, subCategoryName,isCollection } = req.body || {};
    if (!category || !subCategoryName) {
      return res.status(400).json({ message: "All fields are required" });
    }
 
    const subCategoryImage = req.files?.image[0]?.path;
    if (!subCategoryImage) {
      return res.status(400).json({ message: "Image is required" });
    }
    const subCategoryImageUrl = await uploadOnCloudinary(subCategoryImage);
    const collectionImage = req.files.collection?.[0]?.path;
    let collectionImageURL;
    if (collectionImage) {
      collectionImageURL = await uploadOnCloudinary(collectionImage);
    }

    await SubCategory.create({
      subCategoryName,
      subCategoryImage: subCategoryImageUrl,
      collectionImage: collectionImageURL ?? "",
      Category: category,
      isCollection
    });

    return res
      .status(201)
      .json({ message: "Sub category created successfully" });
  } catch (error) {
    console.log("create sub category error", error);
    return res
      .status(500)
      .json({ message: "Failed to create sub category", error: error.message });
  }
};
const updateSubCategory=async(req,res)=>{
    try {
        const { id } = req.params;
        const { category, subCategoryName,isCollection } = req.body || {};
      
      const subCategory = await SubCategory.findById(id);
      if (!subCategory) {
        return res.status(404).json({ message: "Sub category not found" });
      }
      let subCategoryImageUrl;
      if (req.files?.image?.[0]?.path) {
        subCategoryImageUrl = await uploadOnCloudinary(req.file.path);
      }
      let collectionImageURL;
      if(req.files?.collection?.[0]?.path){
        const collectionImage = req.files.collection?.[0]?.path;
         collectionImageURL = await uploadOnCloudinary(collectionImage);
      }
      subCategory.subCategoryName = subCategoryName ?? subCategory.subCategoryName;
      subCategory.subCategoryImage = subCategoryImageUrl ?? subCategory.subCategoryImage;
      subCategory.Category = category ?? subCategory.Category;
      subCategory.collectionImage = collectionImageURL ?? subCategory.collectionImage;
      subCategory.isCollection=isCollection ?? subCategory.isCollection
      const updatedSubCategory = await subCategory.save();
      
      return res.status(200).json({
        message: "Sub category updated successfully",
        data: updatedSubCategory,
      });
    } catch (error) {
        console.log("update sub category error",error);
        return res.status(500).json({message:"Failed to update sub category",error:error.message})
    }
}

const getSingleSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id).populate("Category");
    if (!subCategory) {
      return res.status(404).json({ message: "Sub category not found" });
    }
    return res.status(200).json({
      message: "Sub category retrieved successfully",
      data: subCategory,
    });
  } catch (error) {
    console.log("get single sub category error", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve sub category", error: error.message });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("Category");
  
    return res.status(200).json({
      message: "Sub categories retrieved successfully",
      data: subCategories,
    });
  } catch (error) {
    console.log("get all sub categories error", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve sub categories", error: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await SubCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.error("delete category error", error);
    res
      .status(500)
      .json({ message: "Failed to delete category", error: error.message });
  }
};

const getProductsBySubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ subCategory: id }).populate("subCategory")
    return res.status(200).json({ message: "Products retrieved successfully", data: products });
  } catch (error) {
    console.log("get products by sub category error", error);
    return res.status(500).json({ message: "Failed to retrieve products", error: error.message });
  }
}
export {
    createSubCategory,
    updateSubCategory,
    getSingleSubCategory,
    getAllSubCategories,
    deleteSubCategory,
    getProductsBySubCategory
}