import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({ children }) => {
	const [ok, setOk] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			await axios
				.get("/api/current-user")
				.then((res) => {
					console.log(res.data);
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
						className="flex h-screen items-center 
						justify-center text-9xl text-blue-700"
					/>
				</>
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default UserRoute;
