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
	sendTestEmail,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignIn, currentUser);
router.get("/send-email", sendTestEmail);

module.exports = router;
 