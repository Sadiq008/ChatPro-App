import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getMessages,
  getUserForSidebar,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// * GET METHODS
router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessages);

// * POST METHODS
router.post("/send/:id", protectRoute, sendMessage);

export default router;
