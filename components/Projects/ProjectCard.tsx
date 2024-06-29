"use client";
import React from "react";
import {
	Card,
	CardHeader,
	CardFooter,
	Image,
	Button,
	Link as UiLink,
} from "@nextui-org/react";
import { Project } from "@prisma/client";
import { format } from "date-fns";
import { useLocale } from "@/hooks/useLocale";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
type ProjectCardProps = {
	project: Project;
	handleOpenDeleteProject: (project: Project) => void;
	handleOpenUpdateProject: (project: Project) => void;
};

const formatNameToPathName = (name: string) => {
	return name.replaceAll(" ", "-");
};
const ProjectCard = ({
	project,
	handleOpenDeleteProject,
	handleOpenUpdateProject,
}: ProjectCardProps) => {
	const user = useAuthStore((state) => state.user);
	const { translate } = useLocale();
	const canEdit = user?.email === "lewissmatos@gmail.com";
	return (
		<Card
			isFooterBlurred
			className="w-full max-h-[200px] sm:max-h-[300px] relative overflow-hidden shadow-lg group"
		>
			<CardHeader className="absolute z-10 top-1 flex-row items-start justify-end">
				{canEdit && (
					<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
						<Button
							isIconOnly
							size="sm"
							variant="flat"
							onClick={() => handleOpenUpdateProject(project)}
						>
							<span className="icon-[iconoir--edit-pencil] text-xl "></span>
						</Button>
						<Button
							isIconOnly
							size="sm"
							variant="flat"
							onClick={() => handleOpenDeleteProject(project)}
						>
							<span className="icon-[material-symbols--delete-forever-outline] text-xl"></span>
						</Button>
					</div>
				)}
			</CardHeader>
			<Image
				removeWrapper
				alt={`${project.name} cover image by Lewis S. Matos`}
				className="z-0 w-full h-full object-cover"
				src={project.coverUrl}
			/>
			<CardFooter className="absolute bg-black/30 bottom-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 ">
				<div className="flex flex-grow gap-2 items-center">
					<div className="flex flex-col">
						{/* <p className="text-white/60">{project.description}</p> */}
						<p className="text-white/90 font-medium text-md sm:text-xl">
							{project.name}
						</p>
						<p className="text-white/60 text-sm sm:text-lg">
							{format(project.startedAt, "LLLL, yyyy")}{" "}
							{project.finishedAt
								? ` - ${format(project.finishedAt, "LLLL, yyyy")}`
								: translate("projectCard.inProgress")}
						</p>
					</div>
				</div>
				<div className="flex gap-2">
					{project.url && (
						<Button isIconOnly size="sm" variant="flat">
							<UiLink target="_blank" href={project.url}>
								<span className="icon-[material-symbols--open-in-new] text-white text-md sm:text-xl"></span>
							</UiLink>
						</Button>
					)}

					{project.repoUrl && (
						<Button isIconOnly size="sm" variant="flat">
							<UiLink target="_blank" href={project.repoUrl}>
								<span className="icon-[hugeicons--github-01] text-white text-md sm:text-xl"></span>
							</UiLink>
						</Button>
					)}
					<Button size="sm" variant="flat" className="text-white text-sm">
						<Link href={`/projects/${formatNameToPathName(project.name)}`}>
							{translate("projectCard.seeMore")}...
						</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ProjectCard;
