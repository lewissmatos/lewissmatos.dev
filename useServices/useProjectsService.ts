import { useAxiosInstance } from "./useAxiosInstance";

const useProjectsService = () => {
	const { axiosInstance } = useAxiosInstance();
	const getProjects = async () => {
		const response = await axiosInstance.get("/api/projects");

		return response.data;
	};

	return { getProjects };
};

export { useProjectsService };
