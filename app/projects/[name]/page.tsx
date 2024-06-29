"use client";
import React, { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useProjectsService } from "@/useServices/useProjectsService";
import { Project } from "@prisma/client";
import { useLocale } from "@/hooks/useLocale";
import {
	Chip,
	Image,
	Link,
	Modal,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { format } from "date-fns";
import ProjectScreenshotsModal from "@/components/Projects/ProjectScreenshotsModal";

type VisitExternalLinkProps = {
	url: string;
	labelKey: string;
	iconClassName: string;
};
const VisitExternalLink: FC<VisitExternalLinkProps> = ({
	url,
	labelKey,
	iconClassName,
}) => {
	const { translate } = useLocale();
	return (
		<Link
			target="_blank"
			rel="noreferrer"
			className="text-sm cursor-pointer flex gap-1"
			href={url}
		>
			<span className={`${iconClassName} text-lg`}></span>
			<span className="lg:flex hidden sm:flex">
				{translate("singleProjectPage.checkItOut", {
					replace: {
						values: { element: translate(labelKey) },
					},
				})}
			</span>
		</Link>
	);
};

const page = () => {
	const { getByName, isLoading } = useProjectsService();
	const { translate } = useLocale();
	const { isOpen, onOpenChange } = useDisclosure();
	const [project, setProject] = useState<Project | null>(null);
	const pathname = usePathname();
	const name = pathname.split("/").pop();

	const onGetProject = async () => {
		if (!name) return;
		const _project = await getByName(name);
		setProject(_project);
	};

	useEffect(() => {
		onGetProject();
	}, [name]);

	if (isLoading)
		return (
			<div className="flex flex-col items-center justify-center h-screen w-full ">
				<h3 className="text-center text-2xl font-semibold">
					{translate("loading")}...
				</h3>
			</div>
		);

	if (!project && !isLoading)
		return (
			<div className="flex flex-col items-center justify-center h-screen w-full ">
				<h3 className="text-center text-2xl font-semibold">
					{translate("singleProjectPage.projectNotFound")}
				</h3>
			</div>
		);

	return (
		<>
			{project && (
				<ProjectScreenshotsModal
					project={project}
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				/>
			)}
			<main className="flex flex-col gap-6 items-center overflow-hidden">
				<section
					id="main-info"
					className="grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-4 items-start justify-between"
				>
					<div className="lg:col-span-2 flex flex-col gap-3">
						<h1 className="text-2xl sm:text-4xl font-bold">{project!.name}</h1>
						<Tooltip
							content={
								<div className="max-w-[400px]">
									<p className="text-md">{project!.description}</p>
								</div>
							}
						>
							<div className="line-clamp-[10] text-md">
								{project!.description}
							</div>
						</Tooltip>
						<div className="flex flex-col gap-2 items-start justify-end w-full">
							<p className="align-start text-xl font-bold">
								{translate("technologies")}
							</p>
							<div className="flex flex-wrap gap-2 items-center justify-start ">
								{project!.technologies.map((technology, index) => (
									<Chip key={index}>
										{translate(technology, { capitalize: true })}
									</Chip>
								))}
							</div>
						</div>
					</div>
					<div className="lg:col-span-3 flex flex-col justify-center md:justify-end items-end">
						<Image
							src={project!.coverUrl}
							alt={`${project!.name} project cover - ${translate(
								"singleProjectPage.developedBy",
								{
									replace: { values: { developer: "Lewis Matos" } },
								}
							)}`}
							className="w-full h-full object-cover max-h-[360px] hover:cursor-pointer hover:brightness-150 transition-all duration-300"
							onClick={(e) => {
								e.stopPropagation();
								onOpenChange();
							}}
						/>
						<div className="flex justify-end text-end w-full mt-2">
							<div className="flex gap-3">
								{project!.repoUrl && (
									<VisitExternalLink
										url={project!.repoUrl}
										labelKey="githubRepository"
										iconClassName="icon-[hugeicons--github-01]"
									/>
								)}
								{project!.url && (
									<VisitExternalLink
										url={project!.url}
										labelKey="officialWebsite"
										iconClassName="icon-[hugeicons--internet]"
									/>
								)}
							</div>
							<p className="mx-2 text-gray-500 text-sm">|</p>
							<p className="text-sm">
								{translate("singleProjectPage.fromTo", {
									replace: {
										values: {
											from: format(
												project!.startedAt.toString(),
												"LLLL d, yyyy"
											),
											to: project!.finishedAt
												? format(project!.finishedAt.toString(), "LLLL d, yyyy")
												: "singleProjectPage.inDevelopment",
										},
										withTranslation: true,
									},
								})}
							</p>
						</div>
					</div>
				</section>
				<section className="flex flex-col gap-2 items-start w-full">
					<h2 className="text-xl font-bold">{translate("screenshots")}</h2>
					<div className="flex flex-wrap gap-2 justify-center pb-4">
						{project!.screenshots.map((screenshot, index) => (
							<Image
								key={screenshot}
								src={screenshot}
								alt={`${project!.name} screenshot image`}
								className="w-full max-h-[300px] object-cover hover:cursor-pointer hover:scale-[102%] hover:brightness-150 transition-all duration-300"
								onClick={(e) => {
									e.stopPropagation();
									onOpenChange();
								}}
							/>
						))}
					</div>
				</section>
			</main>
		</>
	);
};

export default page;
