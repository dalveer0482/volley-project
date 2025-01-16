import mongoose from "mongoose";
import reviewSchema from "./schema.js";

const Review = mongoose.model("Review", reviewSchema);
export default Review; 
