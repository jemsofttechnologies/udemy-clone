import express from "express";

const router = express.Router();

// middleware
import { requireSignIn } from "../middlewares";

// controllers
import { uploadImage } from "../controllers/course";

router.post("/upload-image", requireSignIn, uploadImage);

module.exports = router;


 