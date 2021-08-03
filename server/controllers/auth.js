import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
const nodemailer = require("nodemailer");

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// validation
		if (!name) return res.status(400).send("Name is required");
		if (!email) return res.status(400).send("Email is required");
		if (!password || password.length < 6) {
			return res
				.status(400)
				.send(
					"Password is required and should be a minimum of 6 characters long"
				);
		}

		let userExist = await User.findOne({ email }).exec();
		if (userExist) {
			return res.status(400).send("Email is already taken");
		}
		// hash password
		const hashedPassword = await hashPassword(password);

		// register user
		const user = await new User({
			name,
			email,
			password: hashedPassword,
		}).save();

		console.log("saved user", user);

		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again");
	}
};
// Login
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// validation
		if (!email) return res.status(400).send("Email is required");
		if (!password)
			return res.status(400).send("Password is required");
		let user = await User.findOne({ email }).exec();
		if (!user) {
			return res
				.status(400)
				.send("User not found. Wrong Email or Password");
		}
		// check password
		const match = await comparePassword(password, user.password);
		if (!match)
			return res
				.status(400)
				.send("Wrong Email or Password. Try again");
		// create signed jwt
		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);
		// return user and token to client, exclude hashed password
		user.password = undefined;

		// send token in cookie
		res.cookie("token", token, {
			httpOnly: true,
			// secure:true, //Only works on https
		});

		// send use as json response
		res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again");
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("token");
		return res.json({ message: "Signout success" });
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again");
	}
};

export const currentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
			.select("-password")
			.exec();
		console.log("CURRENT_USER", user);
		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
	}
};

// send email
export const sendTestEmail = async (req, res) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "jemsofttests@gmail.com",
				pass: "Qwey8ry8w4t0t079hdasbhfjsdjfbj",
			},
		});

		const options = {
			from: "jemsofttests@gmail.com",
			to: "jemsofttechnologies@gmail.com",
			subject: "Password reset link",
			text: "Please use the following link to reset your password",
			html:
				"<!DOCTYPE html>" +
				"<html><head><title>Password reset</title>" +
				"</head><body><div style=\"display:flex; align-items:center; justify-content:center; flex:1; border: 1px solid grey; \">" +
				'<img src="https://webexplorar.com/wp-content/uploads/2020/05/Password-reset-methods.gif" alt="" width="160">' +
				"<p>Thank you for your appointment.</p>" +
				"<p>Here is summery:</p>" +
				"<p>Name: James Falcon</p>" +
				"<p>Date: Feb 2, 2017</p>" +
				"<p>Package: Hair Cut </p>" +
				"<p>Arrival time: 4:30 PM</p>" +
				"</div></body></html>",
		};
		console.log("Sending email");
		await transporter.sendMail(options, (err, info) => {
			if (err) {
				console.log(err);
				return;
			} else {
				console.log(info.response);
				res.json({ ok: true });
			}
		});
	} catch (err) {
		console.log(err);
	}
};
