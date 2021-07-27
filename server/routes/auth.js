import express from "express";

const router = express.Router();

// Controllers
import  {login, register} from '../controllers/auth'

router.post("/register", register);
router.post("/login", login);

module.exports = router;