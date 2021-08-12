import {
	SettingOutlined,
	UserSwitchOutlined,
} from "@ant-design/icons";
import Button from "@material-tailwind/react/Button";

const BecomeInstructor = () => {
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
					>
						<SettingOutlined />
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
