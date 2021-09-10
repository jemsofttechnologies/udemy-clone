import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

// create express app
const app = express();

// db connection
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERR =>", err));

// Apply middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// Route
readdirSync("./routes").map((r) =>
	app.use("/api", require(`./routes/${r}`))
);

// csrf
app.use(csrfProtection);
app.get("/api/csrf-token", (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});

// port
const port = process.env.PORT || 8000;

// server listening
app.listen(port, console.log(`server is running on port ${port}`));
