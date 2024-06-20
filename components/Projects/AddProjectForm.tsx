import React, { FC } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Input,
	Textarea,
	DatePicker,
	Chip,
} from "@nextui-org/react";
import { useLocale } from "@/hooks/useLocale";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type AddProjectProps = {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
};

const AddProjectForm: FC<AddProjectProps> = ({ isOpen, onOpenChange }) => {
	const { translate } = useLocale();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setValue,
		watch,
	} = useForm<Project>();
	const onSubmit: SubmitHandler<Project> = async (payload) => {
		const res = await axios.post("/api/projects", {
			...payload,
		});
		const isSuccess = res.status === 201;
		if (isSuccess) {
			reset();
			onOpenChange();
			router.refresh();
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={() => {
				reset();
				onOpenChange();
			}}
			placement="center"
			backdrop="blur"
		>
			<ModalContent className="overflow-x-hidden ">
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader className="flex flex-col gap-1">
						{translate("addProjectForm.title")}
					</ModalHeader>

					<ModalBody className="flex flex-col gap-3">
						<Input
							label={translate("name")}
							type="text"
							variant="flat"
							color={errors.name ? "danger" : "default"}
							{...register("name", { required: "Project name is required" })}
						/>
						<Textarea
							label={translate("description")}
							type="text"
							variant="flat"
							color={errors.description ? "danger" : "default"}
							{...register("description")}
						/>
						<Input
							label={translate("coverUrl")}
							type="text"
							variant="flat"
							color={errors.coverUrl ? "danger" : "default"}
							{...register("coverUrl")}
						/>
						<h6 className="text text-sm mb-0">{translate("technologies")}</h6>
						<div className="flex flex-wrap items-start justify-start gap-2">
							{watch("technologies")?.map((tech, index) => {
								return (
									<Chip
										onClose={() => {
											const techs = (watch("technologies") as string[]) || [];
											setValue(
												"technologies",
												techs.filter((t) => t !== tech)
											);
										}}
									>
										{tech}
									</Chip>
								);
							})}
							<Button
								isIconOnly
								size="sm"
								variant="solid"
								onClick={() => {
									const techs = (watch("technologies") as string[]) || [];
									const newTech = prompt("Enter a new technology");
									if (newTech) {
										setValue("technologies", [...techs, newTech]);
									}
								}}
							>
								<span className="text text-lg icon-[fluent--add-square-32-regular]"></span>
							</Button>
						</div>
						<div className="flex flex-row gap-3">
							<DatePicker
								label={translate("startedAt")}
								onChange={(date) => {
									if (!date) return;
									const value = format(
										new Date(date.year, date.month - 1, date.day),
										"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
									);
									setValue("startedAt", value as unknown as Date);
								}}
							/>
							<DatePicker
								label={translate("finishedAt")}
								onChange={(date) => {
									if (!date) return;
									const value = format(
										new Date(date.year, date.month - 1, date.day),
										"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
									);
									setValue("finishedAt", value as unknown as Date);
								}}
							/>
						</div>
						<Input
							label={translate("url")}
							type="text"
							variant="flat"
							color={errors.url ? "danger" : "default"}
							{...register("url")}
						/>
						<Input
							label={translate("repoUrl")}
							type="text"
							variant="flat"
							color={errors.repoUrl ? "danger" : "default"}
							{...register("repoUrl")}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							isLoading={isSubmitting}
							color="primary"
							type="submit"
							disabled={isSubmitting}
						>
							{!isSubmitting
								? translate("addProjectForm.submit")
								: `${translate("loading")}...`}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default AddProjectForm;
