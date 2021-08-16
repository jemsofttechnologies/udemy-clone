import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
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
		// console.log("CURRENT_USER", user);
		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
	}
};

// send email
export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const shortCode = nanoid(6).toUpperCase();
		const user = await User.findOneAndUpdate(
			{ email },
			{ passwordResetCode: shortCode }
		);
		if (!user) res.status(400).send("User not found");

		// Preparing the email
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_FROM,
				pass: process.env.EMAIL_FROM_PASSWORD,
			},
		});
		const options = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Reset Password",
			text: `Hello ${user.name}, Please use the following link to reset your password`,
			html: `<html>
				<h1>Reset password</h1>
				<p> Hello ${user.name}. Please use the following secret code to reset your password</p>
				<h2 style="color:red;">${shortCode}</h2>
				<i>edemy.com</i>
				</html>`,
		};
		// console.log("Sending email");
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

// Reset Password
export const resetPassword = async (req, res) => {
	try {
		const { email, code, newPassword } = req.body;
		// console.table({email, code, newPassword});
		const hashedPassword = await hashPassword(newPassword);
		const user = User.findOneAndUpdate(
			{
				email,
				passwordResetCode: code,
			},
			{
				password: hashedPassword,
				passwordResetCode: "",
			}
		).exec();
		res.json({ ok: true });
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error! Try again");
	}
};


