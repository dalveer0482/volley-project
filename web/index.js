// @ts-check
import express from "express";
import { readFileSync } from "fs";
import { join } from "path";
import serveStatic from "serve-static";
import routes from "../routes/index.js";
import PrivacyWebhookHandlers from "./privacy.js";
import productCreator from "./product-creator.js";
import reviewCreator from "./review-creater.js";
import shopify from "./shopify.js";
import bodyParser from "body-parser";
import getReview from "./getReview.js";
import Shopify_sessions from "./shopifyS.js";
import getShopifyReview from "./shopidyApi/getReviews.js";
import editShopifyReview from "./shopidyApi/editShopifyReview.js";
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);
 
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
// const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017";

// // Connect to MongoDB
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(dbUrl, {
//       dbName: "myshopifydb",
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error.message);
//   }
// };
// connectToDatabase();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);
app.use(bodyParser.json());

// API Endpoint to submit product review
app.post('/api/review', async (req, res) => {
  try {
   // res.status(200).send({ message: 'jkskjdksjdsdkjksjdkjsdkjsdkjdksjk to process the review.' });

       reviewCreator(req, res, Shopify_sessions);
  } catch (error) {
      console.error('Error handling the review submission:', error);
      res.status(500).send({ message: 'Failed to process the review.' });
  }
});

app.get('/api/getreviews', async (req, res) => {
  try {
    getReview(req, res, Shopify_sessions);

  } catch (error) {
    console.error('Error fetching reviews:', error); // Log the error for debugging
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.use("/route", routes);

app.get("/api/products", async (_req, res) => {
  try {
    let allProducts = [];
    let hasNextPage = true;
    let cursor = null;

    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    while (hasNextPage) {
      const response = await client.request(
        `query ($cursor: String) {
          products(first: 10, after: $cursor) {
            edges {
              node {
                id
                title
                description
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        { variables: { cursor } }
      );

      // Add the current page's products to the list
      response?.data?.products.edges.forEach((edge) => {
        allProducts.push(edge.node);
      });

      // Update pagination info
      hasNextPage = response.data?.products.pageInfo.hasNextPage;
      cursor = response.data?.products.pageInfo.endCursor;
    }

    // console.log(">>Products", allProducts);

    // Send the products count as a response
    res.status(200).json({ products: allProducts, count: allProducts.length });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
});

app.get("/api/orders", async (_req, res) => {
  try {
    let allOrders = [];
    let hasNextPage = true;
    let cursor = null;

    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    while (hasNextPage) {
      const response = await client.request(
        `query ($cursor: String) {
          orders(first: 10, after: $cursor) {
            edges {
              node {
                id
                updatedAt
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
        { variables: { cursor } }
      );
      // console.log(">>>>>>>>>>response", response);
      if (!response?.data?.orders?.edges?.length) {
        return res.json({ message: "No Orders found" });
      }
      // Add the current page's products to the list
      response?.data?.orders.edges.forEach((edge) => {
        allOrders.push(edge.node);
      });
      // Update pagination info
      hasNextPage = response.data?.orders.pageInfo.hasNextPage;
      cursor = response.data?.orders.pageInfo.endCursor;
    }
    // console.log(">>Orders", allOrders);
    // Send the products count as a response
    res.status(200).json({ products: allOrders, count: allOrders.length });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
});
app.get("/api/shopify/getreview", async (req, res) => {
 const ss = res.locals.shopify.session;
 getShopifyReview(req, res, ss.shop);
  
});
app.post("/api/shopify/editreview", async (req, res) => {
  const ss = res.locals.shopify.session;
  editShopifyReview(req, res, ss.shop);
   
 })
app.post("/api/products", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

console.log(">>>>>>>>>", PORT);

app.listen(PORT);
