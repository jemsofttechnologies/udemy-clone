import { useContext, useState } from "react";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";

const CourseCreate = () => {
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "9.99",
		uploading: false,
		paid: true,
		category: "",
		loading: false,
	});
	const [Image, setImage] = useState("");
	const [preview, setPreview] = useState("");
	const [uploadButtonText, setUploadButtonText] =
		useState("Upload Image");

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleImage = async (e) => {
		let file = e.target.files[0];
		let formData = new FormData();
		formData.append("image", file)
		setPreview(window.URL.createObjectURL(e.target.files[0]));
		setUploadButtonText(file.name);
		setValues({ ...values, loading: true });

		// file Resize
		// Resizer.imageFileResizer(
		// 	file,
		// 	720,
		// 	500,
		// 	"JPEG",
		// 	100,
		// 	0,
		// 	async (uri) => {
				await axios
					.post("/api/upload-image", formData)
					.then((res) => {
						console.log(`res`, res);
						setValues({ ...values, loading: false });
					})
					.catch((err) => {
						setValues({ ...values, loading: false });
						toast.error(err.response.data);
					});
			// }
		// );
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.table({ values });
	};

	return (
		<InstructorRoute className="flex flex-col">
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-lg rounded-sm"
			>
				<h2 className="">Create Course</h2>
			</div>
			<div>
				<CourseCreateForm
					handleSubmit={handleSubmit}
					handleImage={handleImage}
					handleChange={handleChange}
					values={values}
					setValues={setValues}
					preview={preview}
					uploadButtonText={uploadButtonText}
				/>
			</div>
		</InstructorRoute>
	);
};

export default CourseCreate;
