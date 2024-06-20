import ProjectsList from "@/components/Projects/ProjectsList";
import ProjectsHeader from "@/components/Projects/ProjectsHeader";
import React from "react";

const page = () => {
	return (
		<div className="flex flex-col gap-4 pb-4">
			<ProjectsHeader />
			<ProjectsList />
		</div>
	);
};

export default page;
