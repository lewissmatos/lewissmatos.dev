"use client";
import { useLocale } from "@/hooks/useLocale";
import { RootState, useAppSelector } from "@/redux/appStore";
import { Button, useDisclosure } from "@nextui-org/react";
import React, { FC } from "react";
import AddProjectForm from "./AddProjectForm";

const ProjectsHeader = () => {
	const { translate } = useLocale();
	const { user } = useAppSelector((state: RootState) => state.auth!);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const isAdmin = user?.role?.name === "admin";
	return (
		<>
			<AddProjectForm
				isOpen={isOpen}
				onOpen={onOpen}
				onOpenChange={onOpenChange}
			/>
			<div className="flex flex-row gap-3 items-end">
				<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold">
					{translate("projects")}
				</h1>
				{isAdmin && (
					<Button
						aria-label={translate("addProjectForm.title")}
						isIconOnly
						onClick={onOpenChange}
						variant="flat"
					>
						<span className="text text-xl icon-[fluent--add-square-32-regular]"></span>
					</Button>
				)}
			</div>
		</>
	);
};

export default ProjectsHeader;
