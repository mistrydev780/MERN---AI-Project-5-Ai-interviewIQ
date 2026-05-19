import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected.....................");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDb;