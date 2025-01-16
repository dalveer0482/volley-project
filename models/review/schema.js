import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    shopId: { type: String, required: true },
    productID: { type: Number, required: true },
    reviewTitle: { type: String, required: true },
    reviewerName: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
    reviewStatus: { type: String, required: true }
});

export default reviewSchema;
