import { useContext } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Context } from "../../context";

const InstructorIndex = () => {
	const {
		state: { user },
	} = useContext(Context);

	return (
		<InstructorRoute>
			<div className="flex items-center justify-center flex-col">
				<div
					className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl mb-10"
				>
					<h2 className="">Instructor Dashboard</h2>
				</div>
			</div>
		</InstructorRoute>
	);
};

export default InstructorIndex;
