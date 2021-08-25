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
		<div className="flex flex-row items-center justify-center">
			<form
				className="flex flex-col space-y-6 p-12 pb-4 rounded-md min-w-[80%]"
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
					className="p-3 !bg-gray-600 rounded-md text-md"
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
					<Select
						className="w-full rounded-md"
                        style={{width:"100%", outline:"none"}}
						size="large"
						value={values.paid}
						onChange={(v) =>
							setValues({ ...values, paid: !values.paid })
						}
					>
						<Option value={true}>Paid</Option>
						<Option value={false}>Free</Option>
					</Select>
				</>
				<Button
					onClick={(e) => handleSubmit(e)}
					color="blue"
					buttonType="fill"
					ripple="light"
					disabled={values.loading}
					className="capitalize text-base w-28"
				>
					{values.loading ? (
						<SyncOutlined spin />
					) : (
						<Icon name="send" size="sm" />
					)}
					Submit
				</Button>
			</form>
		</div>
	);
};

export default CourseCreateForm;
