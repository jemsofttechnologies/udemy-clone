import Button from "@material-tailwind/react/Button";
import {
	AppstoreOutlined,
	LoginOutlined,
	LogoutOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { Context } from "../context";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
	const router = useRouter();
	const { asPath } = useRouter();

	// global state
	const { state, dispatch } = useContext(Context);

	// user logout
	const logout = async () => {
		await axios
			.get("/api/logout")
			.then((res) => {
				dispatch({
					type: "LOGOUT",
				});
				window.localStorage.removeItem("user");
				toast.success(res.message);
				router.push("/login");
			})
			.catch((err) => {
				toast.alert(err.response.data);
			});
	};
	return (
		<div className="flex justify-between shadow-lg mb-1">
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
				{!state.user && (
					<>
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
					</>
				)}
			</div>
			{state.user && (
				<div className="flex items-center mr-2 p-2 space-x-2">
					<span className="text-sm font-medium">
						Welcome, {state.user?.name}
					</span>
					<Button
						color="black"
						buttonType="outline"
						rounded={false}
						iconOnly={true}
						ripple="dark"
						className={`h-12 w-24 !border-0 font-medium capitalize
									hover:text-blue-700 hover:!border-b-2 hover:border-blue-700`}
						onClick={logout}
					>
						<LogoutOutlined />
						Logout
					</Button>
				</div>
			)}
		</div>
	);
};

export default Header;
