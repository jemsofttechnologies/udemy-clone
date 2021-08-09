import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import {
	AppstoreOutlined,
	LoginOutlined,
	LogoutOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
	const router = useRouter();
	const { asPath } = useRouter();
	const [subMenu, setSubMenu] = useState(false);

	// global state
	const {
		state: { user },
		dispatch,
	} = useContext(Context);

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
	useEffect(() => {
		setSubMenu(false);
	}, [router]);
	return (
		<div className="shadow-lg mb-1">
			<div className="flex justify-between mx-auto  lg:max-w-7xl">
				<div className="flex space-x-2 pt-2 pl-1 text-3xl">
					<Button
						color="black"
						buttonType="outline"
						rounded={false}
						iconOnly={true}
						ripple="dark"
						className={`!flex h-12 w-14 md:w-16 !border-0 font-medium capitalize ${
							asPath === "/" &&
							"text-blue-700 !border-b-2 border-blue-700"
						}`}
						onClick={() => router.push("/")}
					>
						<AppstoreOutlined style={{}} />
						Apps
					</Button>
					{!user && (
						<>
							<Button
								color="black"
								buttonType="outline"
								rounded={false}
								iconOnly={true}
								ripple="dark"
								className={`!flex h-12 w-24 !border-0 font-medium capitalize ${
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
								className={`!flex h-12 w-24 !border-0 font-medium capitalize ${
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
				{user && (
					<div className="relative">
						<div className="flex flex-col items-center p-2 space-x-2 w-36">
							<Button
								color="black"
								buttonType="outline"
								rounded={false}
								iconOnly={true}
								ripple="dark"
								className={`!flex h-12 w-full !border-0 font-medium capitalize
						  hover:text-blue-700 hover:!border-b-2 hover:border-blue-700 
						  mr-2`}
								onClick={() => setSubMenu(true)}
							>
								<UserOutlined />
								{user.name}
							</Button>
						</div>
						{subMenu && (
							<div
								onMouseLeave={() => setSubMenu(false)}
								className="flex flex-col absolute 
							bg-white w-32 h-20 mt-2 rounded-sm right-1"
							>
								<Button
									color="black"
									buttonType="outline"
									rounded={false}
									iconOnly={true}
									ripple="dark"
									className={`!flex !justify-start !p-2 h-12 w-full  !border-b-1 
										font-medium capitalize hover:bg-gray-100
										hover:text-blue-700 rounded-sm`}
									onClick={() => router.push("/user")}
								>
									<Icon name="dashboard" size="sm" />
									Dashboard
								</Button>
								<Button
									color="black"
									buttonType="outline"
									rounded={false}
									iconOnly={true}
									ripple="dark"
									className={`!flex !justify-start !p-2 h-12 w-full !border-b-1 font-medium capitalize
										hover:text-blue-700 hover:bg-gray-100 rounded-sm`}
									onClick={logout}
								>
									<LogoutOutlined />
									Logout
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
