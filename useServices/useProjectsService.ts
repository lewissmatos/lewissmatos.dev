import { Project } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useAxiosInstance } from "./useAxiosInstance";

const useProjectsService = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { axiosPut, axiosPost, axiosRemove } = useAxiosInstance();
	const get = async () => {
		setIsLoading(true);
		const { data } = await axios.get("/api/projects");
		setProjects(data?.data || []);
		setIsLoading(false);
	};

	const remove = async (id: string) =>
		await onLoad(axiosRemove(`/api/projects/delete?id=${id}`));

	const update = async (payload: Project) =>
		await onLoad(axiosPut(`/api/projects/update`, payload));

	const add = async (payload: Project) =>
		await onLoad(axiosPost("/api/projects/create", payload));

	const onLoad = async (callback: Promise<AxiosResponse<any>>) => {
		setIsLoading(true);
		const res = await callback;
		await get();
		setIsLoading(false);
		return res;
	};

	const getByName = async (name: string) => {
		setIsLoading(true);
		const { data } = await axios.get(`/api/projects?name=${name}`);
		setIsLoading(false);
		return data?.data;
	};

	useEffect(() => {
		get();
	}, []);

	return { projects, get, add, remove, update, isLoading, getByName };
};

export { useProjectsService };
