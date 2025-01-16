import { Review } from "../../models/index.js";
import mongoose from 'mongoose';

export default async function editShopifyReview(req, res, shop) {
  try {
    // Ensure the request method is POST (or PUT if preferred for updates)
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method not allowed." });
    }

    const { reviewId, reviewTitle, reviewText, rating } = req.body;

    // Check if all required fields are provided
    // if (!reviewId || !reviewTitle || !reviewText || typeof rating === "undefined") {
    //   console.error("Missing required fields:", req.body);  // Log missing fields
    //   return res.status(400).json({
    //     success: false,
    //     message: "Missing required fields.",
    //   });
    // }

    // Ensure the reviewId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      console.error("Invalid review ID:", reviewId);  // Log invalid ID
      return res.status(400).json({
        success: false,
        message: "Invalid review ID.",
      });
    }

    // Log the data being sent to the server
    console.log("Received data:", req.body);

    // Find the review by reviewId and update it
    const updatedReview = await Review.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(reviewId), shopId: shop }, // Match reviewId and shopId (for security)
      {
        $set: {
          reviewTitle,
          reviewText,
          rating,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedReview) {
      console.error("Review not found for ID:", reviewId);  // Log if review not found
      return res.status(404).json({ success: false, message: "Review not found.", data: req.body });
    }

    // Log the updated review
    console.log("Updated Review:", updatedReview);

    // Return success response with the updated review
    return res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    // Log the full error to diagnose the issue
    console.error("Error updating review:", error);
    return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
  }
}
