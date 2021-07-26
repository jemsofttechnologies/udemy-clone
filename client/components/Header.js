import Button from "@material-tailwind/react/Button";
import {
	AppstoreOutlined,
	LoginOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const Header = () => {
	const router = useRouter();
	const { asPath } = useRouter();

	return (
		<div className="flex shadow-lg mb-1">
			<div className="flex space-x-2 p-2 text-3xl">
				<Button
					color="black"
					buttonType="outline"
					rounded={false}
					iconOnly={true}
					ripple="dark"
					className={`h-12 w-24 !border-0 font-medium capitalize ${
						asPath === "/" &&
						"text-blue-700 !border-b-2 border-blue-700"
					}`}
					onClick={() => router.push("/")}
				>
					<AppstoreOutlined style={{}} />
					Apps
				</Button>
				<Button
					color="black"
					buttonType="outline"
					rounded={false}
					iconOnly={true}
					ripple="dark"
					className={`h-12 w-24 !border-0 font-medium capitalize ${
						asPath === "/login" &&
						"text-blue-700 !border-b-2 border-blue-700"
					}`}
					onClick={() => router.push("/login")}
				>
					<LoginOutlined />
					Login
				</Button>
				<Button
					color="black"
					buttonType="outline"
					rounded={false}
					iconOnly={true}
					ripple="dark"
					className={`h-12 w-24 !border-0 font-medium capitalize ${
						asPath === "/register" &&
						"text-blue-700 !border-b-2 border-blue-700"
					}`}
					onClick={() => router.push("/register")}
				>
					<UserAddOutlined />
					Register
				</Button>
			</div>
		</div>
	);
};

export default Header;
