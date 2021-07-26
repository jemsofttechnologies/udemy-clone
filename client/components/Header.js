import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {
	AppstoreOutlined,
	LoginOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";

const Header = () => {
	const router = useRouter();
	return (
		<div className="flex shadow-lg mb-1">
			<div className="flex space-x-2 p-2 text-3xl">
				<Button
					color="black"
					buttonType="outline"
					rounded={false}
					iconOnly={true}
					ripple="dark"
					className="h-12 w-24 border-0 font-medium  capitalize"
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
					className="h-12 w-24 border-0 font-medium capitalize"
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
					className="h-12 w-24 border-0 font-medium capitalize"
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
