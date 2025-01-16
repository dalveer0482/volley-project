import Router from "express-promise-router";
import test from "./test/index.js";
import orders from "./orders/index.js";
import cart from "./cart/index.js";

/**
 * @module Routes
 * @description Sets up routing for the Express server with various endpoints.
 */

const router = Router();

router.use("/test", test);
router.use("/orders", orders);
router.use("/cart", cart);

export default router;
