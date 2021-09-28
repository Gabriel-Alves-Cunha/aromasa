import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import { envVariables } from "utils/env";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type ApiUrl =
	| "api/products/:id"
	| "api/payment/:id"
	| "api/products"
	| "api/test";

const baseURL = envVariables.aromasaUrl;

export function useAxiosSWR<DataFormat = any>(
	method: Method,
	url: ApiUrl,
	reqData?: any
) {
	const { data, error, mutate } = useSWR<AxiosResponse<DataFormat>>(
		url,
		async (): Promise<AxiosResponse<DataFormat>> =>
			await axiosInstance({
				data: reqData ?? {},
				method,
				url,
			}),
		{
			revalidateOnReconnect: true,
			refreshWhenHidden: false,
			errorRetryCount: 3,
		}
	);

	const data_ = data?.data;

	return { data_, error, mutate };
}

export const axiosInstance = axios.create({
	headers: { Authorization: "Bearer" },
	timeout: 15_000, // 15 seconds
	baseURL,
});
