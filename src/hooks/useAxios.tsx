import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import { envVariables } from "storage/env";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type ApiUrl =
	| "api/products/:id"
	| "api/payment/:id"
	| "api/products"
	| "api/test";

const baseURL =
	process.env.NODE_ENV === "production"
		? process.env.VERCEL_URL
		: envVariables.aromasaUrl;
console.log("baseURL =", baseURL);

export function useAxiosSWR<DataFormat = any>(
	method: Method,
	url: ApiUrl,
	reqData?: any
) {
	const { data, error, mutate } = useSWR<AxiosResponse<DataFormat>>(
		url,
		async () =>
			await axiosInstance({
				url,
				method,
				data: reqData ?? {},
			}),
		{
			errorRetryCount: 3,
			refreshWhenHidden: false,
			revalidateOnReconnect: true,
		}
	);

	const data_ = data?.data;

	return { data_, error, mutate };
}

export const axiosInstance = axios.create({
	baseURL,
	timeout: 5_000, // 5 seconds
	headers: { Authorization: "Bearer" },
});
