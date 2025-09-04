import express from "express";
import { createShortUrl, redirectUrl, getStats } from "./control.js";

const router = express.Router();

router.post("/shorturls", createShortUrl);

router.get("/shorturls/:shortcode", getStats);

router.get("/:shortcode", redirectUrl);

export default router;