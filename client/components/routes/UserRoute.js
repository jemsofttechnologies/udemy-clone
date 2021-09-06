import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children }) => {
	const [ok, setOk] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			await axios
				.get("/api/current-user")
				.then((res) => {
					// console.log(res.data);
					if (res.data.ok) setOk(true);
				})
				.catch((err) => {
					console.log(err);
					setOk(false);
					router.push("/login");
				});
		};
		fetchUser();
	}, []);
	return (
		<>
			{!ok ? (
				<>
					<SyncOutlined
						spin
						className="flex h-full items-center 
						justify-center text-9xl text-blue-700"
					/>
				</>
			) : (
				<div className="grid grid-flow-col grid-cols-12 gap-2 w-full max-w-7xl mx-auto">
					<div className="hidden md:inline-grid md:col-span-2 shadow-md ">
						<UserNav />
					</div>
					<div className="col-span-12 md:col-span-10 bg-gray-50 h-full">
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default UserRoute;
