import { useContext, useEffect, useState } from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { Context } from "../context";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {state, reducer} = useContext(Context);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(`/api/register`, {
				name,
				email,
				password,
			});
			toast.success("Registration successful. Please login.");
			setLoading(false);
			setName("");
			setEmail("");
			setPassword("");
			router.replace("/login");
		} catch (err) {
			toast.error(err.response.data);
			setLoading(false);
		}
	};
	useEffect(() => {
		if (state.user) router.push("/");
	}, [state.user]);
	return (
		<div className="flex items-center justify-center flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl mb-10"
			>
				<h2 className="">Register</h2>
			</div>
			<section className="shadow-lg">
				<form
					className="flex flex-col space-y-6 p-12 pb-4 rounded-md"
					action=""
					method="post"
					onSubmit={handleSubmit}
				>
					<input
						className="p-3 w-80 bg-gray-200 rounded-md text-md"
						placeholder="Enter name"
						type="text"
						name=""
						id="1"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>

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
					Already registered?
					<span
						onClick={() => router.push("/login")}
						className="text-blue-700 hover:underline hover:cursor-pointer ml-1"
					>
						Login
					</span>
				</p>
			</section>
		</div>
	);
};

export default Register;
