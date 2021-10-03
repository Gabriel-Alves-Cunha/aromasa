import axios from "axios";

import { envVariables } from "utils/env";

const baseURL = envVariables.aromasaUrl;

export const axiosInstance = axios.create({
	headers: { Authorization: "Bearer", "Content-Type": "application/json" },
	timeout: 15_000, // 15 seconds
	baseURL,
});
