import express from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleUserAnalytics,
  handleDelete,
  handleEdit,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/analytics/user/:userId", handleUserAnalytics);
router.post("/delete", handleDelete);
router.post("/edit", handleEdit);

export default router;
