import useToast from "@/hooks/useToast";
import axios, { AxiosInstance } from "axios";

export const useAxiosInstance = () => {
	const { error: toastError, success: toastSuccess } = useToast();
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
			const isSuccess = response?.data?.isSuccess;
			const message = response?.data?.message;
			if (isSuccess) {
				toastSuccess(message);
			} else {
				toastError(message);
			}
			return response;
		},
		(error) => {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			if (error?.response.status === 500) {
				toastError(error.response.data.message);
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
		_axiosInstance: api,
	};
};
