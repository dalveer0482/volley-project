import { Review } from "../models/index.js";
// import mongoose from "mongoose";

// const shopifySessionSchema = new mongoose.Schema({
//   shop: { type: String, required: true },
//   accessToken: { type: String, required: true },
//   isOnline: { type: Boolean, default: false },
//   expiresAt: { type: Date },
// }, { timestamps: true });

// const Shopify_sessions = mongoose.model("Shopify_sessions", shopifySessionSchema);


export default async function reviewCreator(req, res, Shopify_sessions) {
    try {
        const { shopId, productID, reviewTitle, reviewerName, reviewText, rating } = req.body;

        // Check if all required fields are present
        if (!shopId || !productID || !reviewTitle || !reviewerName || !reviewText || !rating) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the shop in your sessions
        const rww = await Shopify_sessions.findOne({ shop: new RegExp(`^${shopId}$`, 'i') });
        if (!rww || rww.shop !== shopId) {
            return res.status(404).json({ success: false, message: 'Shop not found.' });
        }

        // Create the review and set the status to "publish"
        const reviewStatus = "publish";
        const review = new Review({
            shopId,
            productID,
            reviewTitle,
            reviewerName,
            reviewText,
            rating,
            reviewStatus
        });

        // Save the review to the database
        await review.save();

        // Respond with a success message and the review data
        res.status(201).json({ success: true, message: 'Review submitted successfully!', review });
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Failed to submit review.' });
    }
}
