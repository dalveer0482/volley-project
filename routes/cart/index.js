import Router from "express-promise-router";
import put from "./put.js";

const router = Router();

router.put("/", put);

export default router;
