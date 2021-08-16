import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { Context } from "../context";

const Home = () => {
	const router = useRouter();
	const {
		state: { user },
		dispatch,
	} = useContext(Context);
	useEffect(() => {
		user && router.push("/user");
	}, [user]);
	return (
		<div className="">
			<Head>
				<title>Udemy Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				className="flex items-center justify-center w-full h-32 
                bg-gradient-to-r from-blue-600 to-black text-4xl 
                font-medium text-white shadow-xl"
			>
				<h2 className="">Online Education Marketplace</h2>
			</div>
		</div>
	);
};
export default Home;
