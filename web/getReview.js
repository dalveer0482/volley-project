
import { Review } from "../models/index.js";


export default async function getReview(req, res, Shopify_sessions) {
const { shopId, productID } = req.query; // Get the 'shopId' and 'productID' from the query string

// Ensure both shopId and productID are provided
if (!shopId || !productID) {
  return res.status(400).json({ success: false, message: 'shopId and productID are required.' });
}

// Find the shop session from the database
const rww = await Shopify_sessions.findOne({ shop: new RegExp(`^${shopId}$`, 'i') });
if (!rww || rww.shop !== shopId) {
  return res.status(404).json({ success: false, message: 'Shop not found.' });
}

// Find the review for the given shopId and productID
const reviewD = await Review.find({ shopId: new RegExp(`^${shopId}$`, 'i'), productID: productID });
if (!reviewD) {
  return res.status(404).json({ success: false, message: 'Review not found.' });
}

// Send the review data as a response
return res.status(200).json({ success: true, data: reviewD });

};