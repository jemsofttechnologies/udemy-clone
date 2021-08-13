import {
	SettingOutlined,
	SyncOutlined,
	UserSwitchOutlined,
} from "@ant-design/icons";
import Button from "@material-tailwind/react/Button";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../context";

const BecomeInstructor = () => {
	const [loading, setLoading] = useState(false);
	const {
		state: { user },
		dispatch,
	} = useContext(Context);
	const becomeInstructor = async () => {
		setLoading(true);
		await axios
			.post("/api/make-instructor", {
				user,
			})
			.then((res) => {
				setLoading(false);
				toast.success("Setup was successful!")
			})
			.catch((err) => {
				console.log(err.response.data)
				setLoading(false);
				toast.error(err.response.data);
			});
	};
	return (
		<div className="flex flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl"
			>
				<h2 className="">Become Instructor</h2>
			</div>
			<div className="flex justify-center">
				<div className="flex flex-col items-center justify-center mt-10 text-center space-y-6  w-[60%]">
					<UserSwitchOutlined className="text-7xl" />
					<h1 className="text-lg font-semibold">
						Setup payout to publish courses on Udemy
					</h1>
					<p className="text-yellow-400">
						Udemy partners with stripe to transfer earnings to your
						bank account
					</p>
					<Button
						color="blue"
						buttonType="outlined"
						ripple="light"
						className="capitalize"
						disabled={loading}
						onClick={(e) => becomeInstructor(e)}
					>
						{loading ? <SyncOutlined spin /> : <SettingOutlined />}
						Payout Setup
					</Button>
					<p className="">
						You will be redirected to stripe to complete onboarding
						process
					</p>
				</div>
			</div>
		</div>
	);
};

export default BecomeInstructor;
