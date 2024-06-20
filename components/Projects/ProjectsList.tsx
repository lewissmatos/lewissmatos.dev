import prismaClient from "@/app/lib/prisma-db";
import { Project } from "@prisma/client";
import React from "react";

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
		<section>
			{projects.map((project: Project) => {
				return (
					<div key={project.id} className="flex flex-col gap-2">
						<h1>{project.name}</h1>
					</div>
				);
			})}
		</section>
	);
};

export default ProjectsList;
