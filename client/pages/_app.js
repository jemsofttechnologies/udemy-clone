import "@material-tailwind/react/tailwind.css";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				{/* Material Icons Link */}
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
				{/* Font Awesome Link */}
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
					integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
					crossOrigin="anonymous"
				/>
			</Head>
			<Header />
			<ToastContainer position="top-center"/>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;