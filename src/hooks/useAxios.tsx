import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

import { Product } from "../models/Product";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type ApiUrl = "api/products" | "api/test" | "api/products/:id";

export function useAxios<DataFormat = Product>(
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
