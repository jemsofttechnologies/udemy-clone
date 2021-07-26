import mongoose from "mongoose";

const { Schema } = mongoose;

// Instance of user schema
const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
		image: {
			type: String,
			default: "/avatar.png",
		},
		role: {
			type: [String],
			default: ["Subscriber"],
			emun: ["Subscriber", "Instructor", "Admin"],
		},
		stripe_account_id: "",
		stripe_seller: {},
		stripeSession: {},
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
