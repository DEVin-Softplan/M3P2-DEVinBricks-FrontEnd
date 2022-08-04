import axios from "axios";
import env from "react-dotenv";

const getURLBackend = () => {
	const { URL_BACKEND } = env || "";
	return "https://localhost:7171";
};

export const cliente = axios.create({
	baseURL: getURLBackend(),
});
