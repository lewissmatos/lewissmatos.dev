import { Project } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";

const useProjectsService = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const get = async () => {
		setIsLoading(true);
		const { data } = await axios.get("/api/projects");
		setProjects(data?.data || []);
		setIsLoading(false);
	};

	const remove = async (id: string) => {
		await onLoad(axios.delete(`/api/projects/delete?id=${id}`));
	};

	const update = async (payload: Project) => {
		await onLoad(axios.put(`/api/projects/update`, payload));
	};

	const add = async (payload: Project) => {
		const res = await onLoad(axios.post("/api/projects/create", payload));

		return res;
	};

	const onLoad = async (callback: Promise<AxiosResponse<any>>) => {
		setIsLoading(true);
		const res = await callback;
		await get();
		setIsLoading(false);
		return res;
	};

	useEffect(() => {
		get();
	}, []);

	return { projects, get, add, remove, update, isLoading };
};

export { useProjectsService };
