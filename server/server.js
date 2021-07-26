import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

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
app.use(express.json());
app.use(morgan("dev"));

// Route
readdirSync("./routes").map((r) =>
	app.use("/api", require(`./routes/${r}`))
);

// port
const port = process.env.PORT || 8000;

// server listening
app.listen(port, console.log(`server is running on port ${port}`));
