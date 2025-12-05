import mongoose from "mongoose";

const subCategorySchema=new mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true,
    },
    subCategoryImage: {
        type: String,
        required: true,
    },
    collectionImage: {
        type: String,
    },
    isCollection: {
        type: Boolean,
        default: false,
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
},{timestamps:true})

export default mongoose.model("SubCategory", subCategorySchema);