import { SyncOutlined } from "@ant-design/icons";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const data = await axios
			.post("/api/login", {
				email,
				password,
			})
			.then((res) => {
				toast.success("Login successful");
				setLoading(false);
				setEmail("");
				setPassword("");
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.response.data);
			});
		return data;
	};
	return (
		<div className="flex flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl"
			>
				<h2 className="">Login</h2>
			</div>
			<div className="flex items-center justify-center mt-10">
				<section className="shadow-lg">
					<form
						className="flex flex-col space-y-6 p-12 pb-4 rounded-md"
						action=""
						method="post"
						onSubmit={handleSubmit}
					>
						<input
							className="p-3 w-80 bg-gray-200 rounded-md text-md"
							placeholder="Enter email"
							type="email"
							name=""
							id="2"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							className="p-3 w-80 bg-gray-200 rounded-md text-md"
							placeholder="Enter password"
							type="password"
							name=""
							id="3"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Button
							onClick={(e) => handleSubmit(e)}
							color="blue"
							buttonType="fill"
							ripple="light"
							disabled={loading}
						>
							{loading ? (
								<SyncOutlined spin />
							) : (
								<Icon name="send" size="sm" />
							)}
							Submit
						</Button>
					</form>
					<p className="text-center p-3 mb-12">
						Not registered registered?
						<span
							onClick={() => router.push("/register")}
							className="text-blue-700 hover:underline hover:cursor-pointer ml-1"
						>
							Register
						</span>
					</p>
				</section>
			</div>
		</div>
	);
};

export default Login;
