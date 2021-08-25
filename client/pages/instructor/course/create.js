import { useContext, useState } from "react";
import CourseCreateForm from "../../../components/CourseCreateForm";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { Context } from "../../../context";

const CourseCreate = () => {
	
	const {
		state: { user },
	} = useContext(Context);

	

	return (
		<InstructorRoute className="flex flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl"
			>
				<h2 className="">Create Course</h2>
			</div>
			<div>
				<CourseCreateForm  />
			</div>
		</InstructorRoute>
	);
};

export default CourseCreate;
