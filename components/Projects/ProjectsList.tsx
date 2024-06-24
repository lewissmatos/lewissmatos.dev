import { Project } from "@prisma/client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { Button, useDisclosure } from "@nextui-org/react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useProjectsService } from "@/useServices/useProjectsService";
import AddProjectForm from "./AddProjectForm";
import { useLocale } from "@/hooks/useLocale";
import { useAuthStore } from "@/store/auth.store";

const ProjectsList = () => {
	const user = useAuthStore((state) => state.user);
	const { projects, add, update, remove, isLoading } = useProjectsService();
	const { translate } = useLocale();
	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onOpenChange: onOpenChangeDelete,
	} = useDisclosure();
	const {
		isOpen: isOpenAdd,
		onOpen: onOpenAdd,
		onOpenChange: onOpenChangeAdd,
	} = useDisclosure();
	const [selectedProject, setSelectedProject] = React.useState<Project>();

	const isAdmin = user?.role?.name === "admin";

	const handleOpenDeleteProject = (project: Project) => {
		setSelectedProject(project);
		onOpenDelete();
	};

	const onConfirmDeleteProject = async () => {
		if (selectedProject) {
			await remove(selectedProject.id);
			setSelectedProject(undefined);
			onOpenChangeDelete();
		}
	};

	const handleOpenUpdateProject = (project: Project) => {
		setSelectedProject(project);
		onOpenAdd();
	};

	const onSubmit = async (payload: Project) =>
		await (!!selectedProject ? update(payload) : add(payload));

	return (
		<>
			<AddProjectForm
				isOpen={isOpenAdd}
				onOpen={onOpenAdd}
				onOpenChange={() => {
					if (isOpenAdd) {
						setSelectedProject(undefined);
					}
					onOpenChangeAdd();
				}}
				submit={onSubmit}
				defaultValues={selectedProject}
			/>
			<ConfirmDeleteModal
				isOpen={isOpenDelete}
				onOpen={onOpenDelete}
				onOpenChange={onOpenChangeDelete}
				onConfirm={onConfirmDeleteProject}
				onCancel={() => {
					setSelectedProject(undefined);
					onOpenChangeDelete();
				}}
				project={selectedProject as Project}
			/>
			<div className="flex flex-row gap-3 items-end">
				<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold">
					{translate("navbar.projects")}
				</h1>
				{isAdmin && (
					<Button
						aria-label={translate("addProjectForm.title")}
						isIconOnly
						onClick={onOpenChangeAdd}
						variant="flat"
					>
						<span className="text text-xl icon-[fluent--add-square-32-regular]"></span>
					</Button>
				)}
			</div>
			{isLoading && (
				<div className="flex flex-col items-center justify-center h-[500] w-full ">
					<h3 className="text-center text-2xl font-semibold">
						{translate("loading")}...
					</h3>
				</div>
			)}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
				{projects.map((project: Project) => {
					return (
						<ProjectCard
							handleOpenDeleteProject={handleOpenDeleteProject}
							handleOpenUpdateProject={handleOpenUpdateProject}
							project={project}
							key={project.id}
						/>
					);
				})}
			</section>
		</>
	);
};

export default ProjectsList;
