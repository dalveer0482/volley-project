import mongoose from "mongoose";

const shopifySessionSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  accessToken: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  expiresAt: { type: Date },
}, { timestamps: true });

const Shopify_sessions = mongoose.model("Shopify_sessions", shopifySessionSchema);

export default Shopify_sessions;