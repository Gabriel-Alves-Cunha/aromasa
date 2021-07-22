import useSWR from "swr";

export function useAxios<DataFormat = any>(url: string) {
	const {data, error, mutate} = useSWR(url, ()=>{},// myAsyncFnToFetchData,
	{
		errorRetryCount: 3,
		refreshWhenHidden: false,
		revalidateOnReconnect: true,

	})

	return {data, error, mutate}
}