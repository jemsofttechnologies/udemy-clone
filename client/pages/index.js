import Head from "next/head";

export default function Home() {
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
}
