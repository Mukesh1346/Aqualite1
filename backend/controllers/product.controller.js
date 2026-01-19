import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

const createProduct = async (req, res) => {
  try {
    const {
      productName,
      price,
      discount,
      // stock,
      brand,
      description,
      material,
      weight,
      sku,
      dimensionsInch,
      dimensionsCm,
      subCategory,
      Specifications,
      BrandCollectionOverview,
      CareMaintenance,
      seller,
      Warranty,
      category,
      isFeatured,
      size,
    } = req.body || {};

    if (
      !productName ||
      !price ||
      !discount ||
      // !stock ||
      !brand ||
      !description ||
      !isFeatured ||
      !material ||
      !weight ||
      !sku ||
      !dimensionsInch ||
      !dimensionsCm ||
      !subCategory ||
      !Specifications ||
      !BrandCollectionOverview ||
      !CareMaintenance ||
      !seller ||
      !Warranty ||
      !category ||
      !size
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let finalPrice = price - (price * discount) / 100;

    if (!req.files || !req.files.length === 0) {
      return res.status(400).json({ message: "Image is required" });
    }
    if (req.files.length > 5) {
      return res.status(400).json({ message: "Maximum 5 images are allowed" });
    }
    const imageUploadPromises = req.files.map((file) =>
      uploadOnCloudinary(file.path)
    );
    const images = await Promise.all(imageUploadPromises);

    let parsedSize = [];

    if (Array.isArray(req.body.size)) {
      parsedSize = req.body.size;
    } else if (typeof req.body.size === "string") {
      try {
        parsedSize = JSON.parse(req.body.size);
      } catch (err) {
        parsedSize = req.body.size.split(","); // fallback
      }
    }
    const newProduct = new Product({
      productName,
      images,
      price,
      discount,
      // stock,
      finalPrice,
      brand,
      description,
      isFeatured,
      material,
      weight,
      sku,
      dimensionsInch,
      dimensionsCm,
      subCategory,
      Specifications,
      BrandCollectionOverview,
      CareMaintenance,
      seller,
      Warranty,
      category,
      size: parsedSize
    });

    await newProduct.save();
    return res.status(201).json({ message: "Product created successfully", data: newProduct });

  } catch (error) {
    console.error("create product error", error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      price,
      discount,
      stock,
      brand,
      description,
      isFeatured,
      material,
      weight,
      sku,
      dimensionsInch,
      dimensionsCm,
      subCategory,
      Specifications,
      BrandCollectionOverview,
      CareMaintenance,
      seller,
      Warranty,
      category,
      size,
    } = req.body || {};

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let parsedSize = [];

    if (Array.isArray(req.body.size)) {
      parsedSize = req.body.size;
    } else if (typeof req.body.size === "string") {
      try {
        parsedSize = JSON.parse(req.body.size);
      } catch (err) {
        parsedSize = req.body.size.split(","); // fallback
      }
    }

    if (req.files && req.files.length > 0) {
      if (req.files.length > 5) {
        return res.status(400).json({ message: "Maximum 5 images are allowed" });
      }
      const imageUploadPromises = req.files.map((file) =>
        uploadOnCloudinary(file.path)
      );
      const images = await Promise.all(imageUploadPromises);
      product.images = images;
    } else {
      product.images = product.images;
    }
    let priceValue = price ?? product.price;
    let discountValue = discount ?? product.discount;
    let finalPrice = priceValue - (priceValue * discountValue) / 100;
    product.productName = productName ?? product.productName;
    product.price = price ?? product.price;
    product.discount = discount ?? product.discount;
    product.stock = stock ?? product.stock;
    product.finalPrice = finalPrice ?? product.finalPrice;
    product.brand = brand ?? product.brand;
    product.description = description ?? product.description;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.material = material ?? product.material;
    product.weight = weight ?? product.weight;
    product.sku = sku ?? product.sku;
    product.dimensionsInch = dimensionsInch ?? product.dimensionsInch;
    product.dimensionsCm = dimensionsCm ?? product.dimensionsCm;
    product.subCategory = subCategory ?? product.subCategory;
    product.Specifications = Specifications ?? product.Specifications;
    product.BrandCollectionOverview =
      BrandCollectionOverview ?? product.BrandCollectionOverview;
    product.CareMaintenance = CareMaintenance ?? product.CareMaintenance;
    product.seller = seller ?? product.seller;
    product.Warranty = Warranty ?? product.Warranty;
    product.category = category ?? product.category;
    product.size = parsedSize ?? product.size;
    const updatedProduct = await product.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("update product error", error);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("subCategory");
    return res
      .status(200)
      .json({ message: "Products retrieved successfully", data: products });
  } catch (error) {
    console.error("get all products error", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category").populate("subCategory").populate("size");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product retrieved successfully", data: product });
  } catch (error) {
    console.error("get single product error", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    console.error("delete product error", error);
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { query, category, priceMin, priceMax, discountMin, sortBy, material } =
      req.query;

    const filter = {};
    const sort = {};

    if (query) {
      const regex = new RegExp(query, "i");
      filter.$or = [
        { productName: regex },
        { description: regex },
        { brand: regex },
        { weight: regex },
        { material: regex },
      ];
    }
    if (category) {
      filter.category = category;
    }

    if (material) {
      filter.material = material;
    }
    if (priceMin || priceMax) {
      filter.finalPrice = {};
      if (priceMin) filter.finalPrice.$gte = priceMin;
      if (priceMax) filter.finalPrice.$lte = priceMax;
    }

    if (discountMin) {
      filter.discount = { $gte: discountMin };
    }

    if (sortBy === "lowToHigh") sort.finalPrice = 1;
    else if (sortBy === "highToLow") sort.finalPrice = -1;
    else if (sortBy === "new") sort.createdAt = -1;

    const products = await Product.find(filter).populate("category").sort(sort);

    return res.status(200).json({
      message: "Products retrieved successfully",
      totalResults: products.length,
      data: products,
    });
  } catch (error) {
    console.log("search products error", error);
    return res.status(500).json({ message: "Failed to search products" });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).populate(
      "subCategory"
    );
    return res.status(200).json({
      message: "Featured products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("get featured products error", error);
    res.status(500).json({
      message: "Failed to retrieve featured products",
      error: error.message,
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ category: id }).populate(
      "subCategory"
    );
    return res
      .status(200)
      .json({ message: "Products retrieved successfully", data: products });
  } catch (error) {
    console.error("get products by category error", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

const getAllMaterials = async (req, res) => {
  try {
    const materials = await Product.distinct("material");
    return res.status(200).json({
      message: "Materials retrieved successfully",
      data: materials,
    });
  } catch (error) {
    console.error("get all materials error", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve materials", error: error.message });
  }
}
export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getFeaturedProducts,
  getProductByCategory,
  getAllMaterials
};
