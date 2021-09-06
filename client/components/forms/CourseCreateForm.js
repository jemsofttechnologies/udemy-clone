import { SyncOutlined } from "@ant-design/icons";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import Icon from "@material-tailwind/react/Icon";
import { Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;
const CourseCreateForm = () => {
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "9.99",
		uploading: false,
		paid: true,
		loading: false,
		imagePreview: "",
	});
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleImage = () => {
		//
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.table({ values });
	};
	return (
		<div className="flex flex-col items-center justify-center">
			<form
				className="flex flex-col space-y-6 p-12  mt-2 border rounded-md min-w-[90%] xl:min-w-[100%] shadow-lg"
				action=""
				method="post"
				onSubmit={handleSubmit}
			>
				<Input
					placeholder="Enter name"
					outline={true}
					type="text"
					name="name"
					id="2"
					value={values.name}
					onChange={(e) => handleChange(e)}
					className={`p-3 bg-white rounded-md text-md`}
					required
				/>
				<Textarea
					className="p-3  bg-gray-200 rounded-md text-md outline-none focus:border-2 focus:border-blue-500"
					placeholder="Enter description"
					outline={true}
					rows="7"
					cols="7"
					type="text"
					name="description"
					id="3"
					value={values.description}
					onChange={(e) => handleChange(e)}
					required
				/>
				<>
					<select
						value={values.paid}
						onChange={(v) =>
							setValues({ ...values, paid: !values.paid })
						}
						className="h-10 outline-none border p-1 focus:border-2 focus:border-blue-400 rounded-md hover:bg-blue-100 hover:cursor-pointer"
					>
						<option className="" value={true}>
							Paid
						</option>
						<option value={false}>Free</option>
					</select>
				</>
				<div className="flex flex-row items-center w-full p-2 border h-10 rounded-md hover:bg-blue-100 ">
					<label
						htmlFor="image"
						className="flex-1 hover:cursor-pointer"
					>
						{values.loading ? "Uploading" : "Upload Image"}
						<input
							type="file"
							id="image"
							name="image"
							onChange={handleImage}
							accept="image/*"
							className="flex-1 hidden"
						/>
					</label>
				</div>
				<Button
					onClick={(e) => handleSubmit(e)}
					color="blue"
					buttonType="fill"
					ripple="light"
					disabled={values.loading || values.uploading}
					className="capitalize text-base"
				>
					{values.loading ? (
						<>
							<SyncOutlined spin />
							Saving...
						</>
					) : (
						<>
							<Icon name="save" size="sm" />
							Save & Continue
						</>
					)}
				</Button>
			</form>
			{/* <pre>{JSON.stringify(values,null,4)}</pre> */}
		</div>
	);
};

export default CourseCreateForm;
