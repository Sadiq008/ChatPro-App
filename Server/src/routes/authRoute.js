import express from "express";
import {
  checkAuth,
  login,
  logOut,
  signUp,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// * POST Routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logOut);

// * PUT Routes
router.put("/update-profile", protectRoute, updateProfile);

// * GET Routes
router.get("/check", protectRoute, checkAuth);

export default router;
