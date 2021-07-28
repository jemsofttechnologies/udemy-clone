import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

const UserIndex = () => {
	const [hidden, setHidden] = useState(true);
	const {
		state: { user },
	} = useContext(Context);
	useEffect(() => {
		const fetchUser = async () => {
			await axios
				.get("/api/current-user")
				.then((res) => {
					// console.log(res);
					setHidden(false);
				})
				.catch((err) => {
					console.log(err);
					setHidden(true);
				});
		};
		fetchUser();
	}, []);
	return (
		<>
			{!hidden && (
				<div className="flex items-center justify-center flex-col">
					<div
						className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl mb-10"
					>
						<h2 className="">User</h2>
					</div>
				</div>
			)}
		</>
	);
};

export default UserIndex;
