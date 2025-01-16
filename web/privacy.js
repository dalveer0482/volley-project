import { DeliveryMethod } from "@shopify/shopify-api";

import axios from "axios";
import { Cart } from "../models/index.js";

/**
 * Webhook Handlers
 *
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
 */
export default {
  /**
   * Handles Cart Creation Webhook
   * Triggered when a new cart is created.
   *
   * @see https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#carts-create
   */
  CARTS_CREATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      try {
        const payload = JSON.parse(body); // Parse the webhook payload
        console.log(`Received ${topic} from shop: ${shop}`);

        const cart = new Cart({
          id: payload.id,
          token: payload.token,
          line_items: payload.line_items,
          note: payload.note,
          updated_at: new Date(payload.updated_at),
          created_at: new Date(payload.created_at),
        });

        // Save the cart to MongoDB
        await cart.save();
        console.log("Cart saved to MongoDB:", cart);
      } catch (error) {
        console.error("Error processing CARTS_CREATE webhook:", error);
      }
    },
  },

  /**
   * Handles Cart Update Webhook
   * Triggered when a cart is updated.
   *
   * @see https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#carts-update
   */
  CARTS_UPDATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      try {
        const payload = JSON.parse(body); // Parse the webhook payload
        console.log(`Received ${topic} from shop: ${shop}`);

        // Send the updated cart data to the backend
        await axios.put(
          `http://localhost:${process.env.BACKEND_PORT}/route/cart`,
          payload
        );
        console.log("Cart updated in backend");
      } catch (error) {
        console.error("Error processing CARTS_UPDATE webhook:", error);
      }
    },
  },

  /**
   * Handles Customer Data Request Webhook
   * Triggered when a customer requests their data.
   *
   * @see https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-data-request
   */
  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      // Process the customer data request here
      console.log(`Customer data request received for shop: ${shop}`);
    },
  },

  /**
   * Handles Customer Redact Webhook
   * Triggered when customer data is redacted.
   *
   * @see https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-redact
   */
  CUSTOMERS_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      // Process the customer redact request here
      console.log(`Customer data redacted for shop: ${shop}`);
    },
  },

  /**
   * Handles Shop Redact Webhook
   * Triggered when the store owner uninstalls the app and redacts the shop data.
   *
   * @see https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#shop-redact
   */
  SHOP_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      // Process the shop redact request here
      console.log(`Shop data redacted for shop: ${shop}`);
    },
  },
};
