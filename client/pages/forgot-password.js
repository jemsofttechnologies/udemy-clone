import { SyncOutlined } from "@ant-design/icons";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(true);
	const [code, setCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const {
		state: { user },
	} = useContext(Context);
	const router = useRouter();

	// Redirect if user is logged in
	useEffect(() => {
		if (user) router.push("/");
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await axios
			.post("/api/forgot-password", { email })
			.then((res) => {
				setSuccess(true);
				toast.info("Check your email for the secret code");
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.response.data);
			});
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		setLoading(true);
		await axios
			.post("/api/reset-password", {
				email,
				code,
				newPassword,
			})
			.then((res) => {
				setLoading(false);
				setEmail("");
				setNewPassword("");
				setCode("");
			})
			.catch((err) => {
				toast.error(err.response.data);
				setLoading(false);
			});
	};
	return (
		<div className="flex flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl"
			>
				<h2 className="">Forgot Email</h2>
			</div>
			<div className="flex items-center justify-center mt-10">
				<section className="shadow-lg p-10">
					<form
						className="flex flex-col  space-y-6 p-12 pb-4 rounded-md mb-10"
						action=""
						method="post"
						onSubmit={success ? handleResetPassword : handleSubmit}
					>
						<input
							className="p-3 w-80 bg-gray-200 rounded-md text-md "
							placeholder="Enter email"
							type="email"
							name=""
							id="7"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{success && (
							<>
								<input
									className="p-3 w-80 bg-gray-200 rounded-md text-md "
									placeholder="Enter secret code"
									type="text"
									name=""
									id="8"
									value={code}
									onChange={(e) => setCode(e.target.value)}
									required
								/>
								<input
									className="p-3 w-80 bg-gray-200 rounded-md text-md "
									placeholder="Enter new password"
									type="password"
									name=""
									id="9"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									required
								/>
							</>
						)}
						<Button
							// onClick={(e) => handleSubmit(e)}
							color="blue"
							buttonType="fill"
							ripple="light"
							disabled={loading}
							className="capitalize text-base p-3"
						>
							{loading ? (
								<SyncOutlined spin />
							) : (
								<Icon name="send" size="sm" />
							)}
							Submit
						</Button>
					</form>
				</section>
			</div>
			);
		</div>
	);
};

export default ForgotPassword;
