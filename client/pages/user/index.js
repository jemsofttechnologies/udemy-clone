import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
	const {
		state: { user },
	} = useContext(Context);

	return (
		<UserRoute>
			<div className="flex items-center justify-center flex-col">
				<div
					className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl mb-10"
				>
					<h2 className="">User Dashboard</h2>
				</div>
			</div>
		</UserRoute>
	);
};

export default UserIndex;
