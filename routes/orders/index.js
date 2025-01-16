import Router from "express-promise-router";
import post from "./post.js";

const router = Router();

router.post("/", post);

export default router;
