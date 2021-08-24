import User from "../models/User";
import { nanoid } from "nanoid";
// import queryString from "query-string";

// Make Instructor
export const makeInstructor = async (req, res) => {
	try {
		// find user from db
		const user = await User.findById(req.user._id).exec();
		const callbackUrl = "http://localhost:3000/stripe/callback";

		// if user don't have a stripe_account_id yet, create new
		if (!user.stripe_account_id) {
			user.stripe_account_id = nanoid(16);
			user.save();
		}

		return res.status(200).send(`${callbackUrl}`);
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error! Try again");
	}
};

export const getAccountStatus = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).exec();
		if (!user.stripe_account_id) {
			return res.status(401).send("Unauthorized Access");
		} else {
			const statusUpdated = await User.findByIdAndUpdate(
				user._id,
				{
					$addToSet: { role: "Instructor" },
				},
				{ new: true }
			)
				.select(["-password", "-passwordResetCode"])
				.exec();
			// statusUpdated.password = undefined;
			// statusUpdated.passwordResetCode = undefined;
			return res.json(statusUpdated);
		}
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error! Try again");
	}
};

export const currentInstructor = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
			.select(["-password", "-passwordResetCode"])
			.exec();
		if (!user.role.includes("Instructor")) {
			return res.status(403);
		} else {
			return res.json({ ok: true });
		}
	} catch (err) {
		console.log(err);
		return res.status(400).send("Error! Try again");
	}
};
