import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type ApiUrl =
	| "api/products/:id"
	| "api/payment/:id"
	| "api/products"
	| "api/test";

export function useAxios<DataFormat = any>(
	method: Method,
	url: ApiUrl,
	reqData?: any
) {
	const { data, error, mutate } = useSWR<AxiosResponse<DataFormat>>(
		url,
		async () =>
			await axios({
				url,
				method,
				timeout: 10_000, // 10 seconds
				data: reqData ?? {},
				headers: { Authorization: "Bearer" },
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
