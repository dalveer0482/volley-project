import { Review } from "../../models/index.js";

export default async function getShopifyReview(req, res, shop){
    

// Find the review for the given shopId and productID
const reviewD = await Review.find({ shopId: new RegExp(`^${shop}$`, 'i')});
if (!reviewD) {
  return res.status(404).json({ success: false, message: 'Review not found.' });
}

// Send the review data as a response
return res.status(200).json({ success: true, data: reviewD });
}