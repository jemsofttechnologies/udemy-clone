import express from "express";

const router = express.Router();
// middleware
import { requireSignIn } from "../middlewares";

// Controllers
import {
	login,
	register,
	logout,
	currentUser,
	forgotPassword,
	resetPassword,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router; 
 