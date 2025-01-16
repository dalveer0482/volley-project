import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
// import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-10";
import mongoose from "mongoose";
// const DB_PATH = `${process.cwd()}/database.sqlite`;
// const DB_PATH = "mongodb://localhost:27017"; // Example MongoDB connection string
// const dbUrl = new URL(DB_PATH);

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/shopifyApp";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};
connectToDatabase();

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
  "My Shopify One-Time Charge": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.OneTime,
  },
};
// const dbUrl = new URL("mongodb://localhost:27017");
// const dbName = "my-shopify-db";

// const sessionStorage = new MongoDBSessionStorage(dbUrl, dbName);

// // Optionally, add more logging to confirm it's connected
// sessionStorage.ready
//   .then(() => {
//     console.log("Connected to MongoDB for session storage");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    future: {
      customerAddressDefaultFix: true,
      lineItemBilling: true,
      unstable_managedPricingSupport: true,
    },
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },

  // This should be replaced with your preferred storage strategy
  // sessionStorage: new SQLiteSessionStorage(DB_PATH),
  sessionStorage: new MongoDBSessionStorage(MONGO_URI),
});

export default shopify;
