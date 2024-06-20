import prismaClient from "@/app/lib/prisma-db";
import { Project } from "@prisma/client";
import React from "react";
import ProjectCard from "./ProjectCard";

const getProducts = async () => {
	try {
		const response = await prismaClient.project.findMany();
		return response;
	} catch (error) {
		return [];
	}
};

const ProjectsList = async () => {
	const projects = await getProducts();

	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
			{projects.map((project: Project) => {
				return <ProjectCard project={project} key={project.id} />;
			})}
		</section>
	);
};

export default ProjectsList;
