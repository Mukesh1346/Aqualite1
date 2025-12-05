import mongoose from "mongoose";

export const connectDB=async()=>{
try {
 const connection= await mongoose.connect(process.env.MONGO_URL);  
 console.log("mongodb connected",connection.connection.host);
} catch (error) {
    console.log("mongoose error",error);
    process.exit(1);
}
}