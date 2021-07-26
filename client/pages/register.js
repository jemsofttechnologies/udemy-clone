import { useState } from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Input from "@material-tailwind/react/Input";
import axios from "axios";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await axios
			.post("http://localhost:8000/api/register", {
				name,
				email,
				password,
			})
			.catch((error) => alert(error.message));
		setName("");
		setEmail("");
		setPassword("");

		return data;
	};

	return (
		<div className="flex items-center justify-center flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl mb-10"
			>
				<h2 className="">Register</h2>
			</div>
			<section className="">
				<form
					className="flex flex-col space-y-6 shadow-lg p-12 rounded-md"
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
					>
						<Icon name="send" size="sm" />
						Submit
					</Button>
				</form>
			</section>
		</div>
	);
};

export default Register;
