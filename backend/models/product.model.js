import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: Number.MAX_SAFE_INTEGER
        },
        finalPrice: {
            type: Number,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        material: {
            type: String,
            required: true
        },
        weight: {
            type: String,
            required: true
        },
        size: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Size",
        }],
        sku: {
            type: String,
            required: true
        },
        dimensionsInch: {
            type: String,
            required: true
        },
        dimensionsCm: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
        },
        Specifications: {
            type: String,
            required: true
        },
        BrandCollectionOverview: {
            type: String,
            required: true
        },
        CareMaintenance: {
            type: String,
            required: true
        },
        seller: {
            type: String
        },
        Warranty: {
            type: String,
            required: true
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);