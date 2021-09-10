import { CarryOutOutlined } from "@ant-design/icons";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../../context";

const InstructorNav = () => {
	const router = useRouter();
	const { asPath } = useRouter();
	const { state, dispatch } = useContext(Context);
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
		<div
			className="flex flex-col  
							bg-white w-full h-20  rounded-sm right-1"
		>
			<Button
				color="black"
				buttonType="outline"
				rounded={false}
				iconOnly={true}
				ripple="dark"
				className={`!flex !justify-start !p-2 h-12 !w-full border-0 border-b-2 
										font-medium capitalize hover:bg-gray-100
										hover:text-blue-700 rounded-sm ${
											asPath === "/instructor" &&
											"text-white bg-blue-500"
										}`}
				onClick={() => router.push("/instructor")}
			>
				<Icon name="dashboard" size="sm" />
				<span className="hidden md:inline-flex ml-2">Dashboard</span>
			</Button>
			<Button
				color="black"
				buttonType="outline"
				rounded={false}
				iconOnly={true}
				ripple="dark"
				className={`!flex !justify-start !p-2 h-12 !w-full border-0 border-b-2 
										font-medium capitalize hover:bg-gray-100
										hover:text-blue-700 rounded-sm ${
											asPath === "/instructor/course/create" &&
											"text-white bg-blue-500"
										}`}
				onClick={() => router.push("/instructor/course/create")}
			>
				<CarryOutOutlined size="sm" />
				<span className="hidden md:inline-flex ml-2">
					Course Create
				</span>
			</Button>
			<Button
				color="black"
				buttonType="outline"
				rounded={false}
				iconOnly={true}
				ripple="dark"
				className={`!flex !justify-start !p-2 h-12 !w-full border-0 border-b-2 
										font-medium capitalize hover:bg-gray-100
										hover:text-blue-700 rounded-sm`}
				onClick={logout}
			>
				<Icon name="logout" size="sm" />
				<span className="hidden md:inline-flex ml-2">Logout</span>
			</Button>
		</div>
	);
};

export default InstructorNav;
