import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";

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
		const {email, password } = req.body;

		// validation
		if (!email) return res.status(400).send("Email is required");
		if (!password) return res.status(400).send("Password is required");
		let userExist = await User.findOne({ email }).exec();
		if (!userExist) {
			return res.status(400).send("User not found. Wrong Email or Password");
		}
		// hash password
		const hashedPassword = await hashPassword(password);

		// login  user
		// const user = await new User({
		// 	name,
		// 	email,
		// 	password: hashedPassword,
		// }).save();

		// console.log("saved user", user);

		return res.json({ ok: true });
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error. Try again");
	}
};