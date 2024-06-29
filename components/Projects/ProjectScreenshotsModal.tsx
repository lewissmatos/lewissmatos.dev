import { useLocale } from "@/hooks/useLocale";
import { Image, Modal, ModalContent } from "@nextui-org/react";
import { Project } from "@prisma/client";
import React, { FC } from "react";

type ProjectScreenshotsModalProps = {
	project: Project;
	isOpen: boolean;
	onOpenChange: () => void;
};
const ProjectScreenshotsModal: FC<ProjectScreenshotsModalProps> = ({
	project,
	isOpen,
	onOpenChange,
}) => {
	const { translate } = useLocale();
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement="center"
			backdrop="blur"
			size="full"
			className="p-4"
		>
			<ModalContent className="overflow-y-auto ">
				<div className="flex flex-wrap gap-4 justify-center pt-4">
					<Image
						src={project.coverUrl}
						alt={`${project!.name} project cover - ${translate(
							"singleProjectPage.developedBy",
							{
								replace: { values: { developer: "Lewis Matos" } },
							}
						)}`}
						className="w-full max-h-[700px] object-cover "
					/>
					{project.screenshots.map((screenshot, index) => (
						<Image
							key={screenshot}
							src={screenshot}
							alt={`${project!.name} screenshot image`}
							className="w-full max-h-[700px] object-cover "
						/>
					))}
				</div>
			</ModalContent>
		</Modal>
	);
};

export default ProjectScreenshotsModal;
