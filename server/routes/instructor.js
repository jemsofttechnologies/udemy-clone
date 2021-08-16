import express from "express";

const router = express.Router();

// middleware
import { requireSignIn } from "../middlewares";

// controllers
import {
	makeInstructor,
	getAccountStatus,
} from "../controllers/instructor";

router.post("/make-instructor", requireSignIn, makeInstructor);
router.post("/get-account-status", requireSignIn, getAccountStatus);

module.exports = router;
