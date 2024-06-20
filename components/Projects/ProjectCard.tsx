import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Button,
	Link,
} from "@nextui-org/react";
import { Project } from "@prisma/client";
import { format } from "date-fns";
import { useLocale } from "@/hooks/useLocale";
import { cookies } from "next/headers";
import { AppLanguage } from "@/redux/reducers/preferences/preferencesSlice";
import { translate } from "@/utils/lang.utils";

const ProjectCard = ({ project }: { project: Project }) => {
	const cookieStore = cookies();
	const lang = cookieStore.get("lang")
		? cookieStore.get("lang")!.value
		: "en-US";
	// const { translate } = useLocale(lang as AppLanguage);
	return (
		<Card
			isFooterBlurred
			className="w-full h-[350px]  relative overflow-hidden shadow-sm"
		>
			<CardHeader className="absolute z-10 top-1 flex-col items-start">
				<h4 className="text-white/90 font-medium text-2xl">{project.name}</h4>
			</CardHeader>
			<Image
				removeWrapper
				alt={`${project.name} cover image by Lewis S. Matos`}
				className="z-0 w-full h-full object-cover"
				src={
					project.coverUrl || "https://nextui.org/images/card-example-5.jpeg"
				}
			/>
			<CardFooter className="absolute bg-black/20 bottom-0 z-10 border-t-1 border-default-600 border-default-100">
				<div className="flex flex-grow gap-2 items-center">
					<div className="flex flex-col text-sm">
						<p className="text-white/60">{project.description}</p>
						<p className="text-white/60">
							{format(project.startedAt, "yyyy-MM-dd")}
						</p>
					</div>
				</div>

				<div className="flex gap-2">
					{project.url && (
						<Button isIconOnly size="sm" variant="flat">
							<Link target="_blank" href={project.url}>
								<span className="icon-[material-symbols--open-in-new] text-white text-xl"></span>
							</Link>
						</Button>
					)}

					{project.repoUrl && (
						<Button isIconOnly size="sm" variant="flat">
							<Link target="_blank" href={project.repoUrl}>
								<span className="icon-[hugeicons--github-01] text-white text-xl"></span>
							</Link>
						</Button>
					)}
					<Button size="sm" variant="flat" className="text-white text-sm">
						{translate("name")}...
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ProjectCard;
