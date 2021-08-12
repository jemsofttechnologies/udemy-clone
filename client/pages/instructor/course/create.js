import { useContext, useState } from "react";
import { Context } from "../../../context";

const CourseCreate = () => {
	const [loading, setLoading] = useState(false);
	const {
		state: { user },
	} = useContext(Context);
    
	return (
		<div className="flex flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl"
			>
				<h2 className="">Create Course</h2>
			</div>
		</div>
	);
};

export default CourseCreate;
