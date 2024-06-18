import { IProject } from "@/interfaces/project.interface";
import React from "react";

const ProjectCard = ({ project }: { project: IProject }) => {
	return <div>{project.name}</div>;
};

export default ProjectCard;
