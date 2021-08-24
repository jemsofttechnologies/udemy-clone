import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Context } from "../../context";

const StripeCallback = () => {
	const router = useRouter();
	const {
		state: { user },
		dispatch,
	} = useContext(Context);
	useEffect(() => {
		if (user) {
			axios
				.post("/api/get-account-status")
				.then((res) => {
					// console.log(res)
					dispatch({
						type: "LOGIN",
						payload: res.data,
					});
					window.localStorage.setItem(
						"user",
						JSON.stringify(res.data)
					);
					router.push("/instructor");
				})
				.catch((err) => {
					toast.error(err.response.message);
				});
		}
	}, [user]);
	return (
		<div className="flex h-full justify-center items-center  text-blue-700 text-8xl">
			<SyncOutlined spin />
		</div>
	);
};

export default StripeCallback;
