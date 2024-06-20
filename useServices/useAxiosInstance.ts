import axios, { AxiosInstance, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const useAxiosInstance = () => {
	const api: AxiosInstance = axios.create({
		// baseURL: process.env.,
		timeout: 60000, // Timeout in milliseconds
		headers: {
			"Content-Type": "application/json", // Default content type for requests
		},
	});

	// Set the AUTH token for any request
	api.interceptors.request.use(function (config) {
		// TODO
		// const token = getTokenFormStore();
		// config.headers.Authorization = token ? `Bearer ${token}` : "";
		return config;
	});

	// Add a response interceptor
	api.interceptors.response.use(
		(response) => {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			// dispatch(setTokenReducer(response?.data?.token));
			return response;
		},
		(error) => {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			if (error?.response.status === 500) {
				toast.error(error.response.data.message);
			}
			if (error?.response.status === 401) {
			}
			return Promise.reject(error);
		}
	);

	const axiosGet = async (url: string, params: any = {}): Promise<any> => {
		return api.get(url, { params });
	};

	const axiosPost = async (
		url: string,
		data: any = {},
		params: any = {}
	): Promise<any> => {
		return api.post(url, data, { ...params });
	};

	const axiosPut = async (
		url: string,
		data: any = {},
		params: any = {}
	): Promise<any> => {
		return api.put(url, data, { params });
	};

	const axiosRemove = async (url: string, params: any = {}): Promise<any> => {
		return api.delete(url, { params });
	};

	return {
		axiosGet,
		axiosPost,
		axiosPut,
		axiosRemove,
		axiosInstance: api,
	};
};
