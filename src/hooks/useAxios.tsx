import axios, { AxiosResponse } from "axios";
import assert from "node:assert";
import useSWR from "swr";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type ApiUrl = "api/products" | "api/test" | "api/products/:id";

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
				timeout: 10000,
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
