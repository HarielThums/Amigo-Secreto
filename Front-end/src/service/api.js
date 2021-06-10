import axios from "axios";
import useSWR from "swr";

const api = axios.create({ baseURL: "http://localhost:3003/" });

export function useFetch(url) {
	const { data, error } = useSWR(url, async (url) => {
			const response = await api.get(url);

			return response.data;
		}, { refreshInterval: 1000 }
	);
	return { data, error };
}

export default api;
