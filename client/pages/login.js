import { SyncOutlined } from "@ant-design/icons";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// access to global state
	const { state, dispatch } = useContext(Context);

	useEffect(() => {
		if (state.user) router.push("/");
	}, [state.user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const data = await axios
			.post("/api/login", {
				email,
				password,
			})
			.then((res) => {
				dispatch({ type: "LOGIN", payload: res.data });
				toast.success("Login successful");
				setLoading(false);  
				setEmail("");
				setPassword("");
				// save user to a local storage
				window.localStorage.setItem("user", JSON.stringify(res.data));
				// redirecting
				router.replace("/user");
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
						className="flex flex-col  space-y-6 p-12 pb-4 rounded-md"
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
							className="capitalize text-base"
						>
							{loading ? (
								<SyncOutlined spin />
							) : (
								<Icon name="send" size="sm" />
							)}
							Sign in
						</Button>
					</form>
					<p className="text-center p-3 mb-7">
						<span
							onClick={() => router.push("/forgot-password")}
							className="text-base text-gray-500 hover:text-blue-700 hover:underline hover:cursor-pointer"
						>
							Forgot password?
						</span>
					</p>
					<p className="text-center p-6 border">
						New here?
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
