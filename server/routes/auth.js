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
	becomeInstructor,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/make-instructor", becomeInstructor);

module.exports = router; 
 