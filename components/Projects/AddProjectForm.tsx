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
import { format } from "date-fns";
import { AxiosResponse } from "axios";
import UploadToCloudinary from "../Cloudinary/UploadToCloudinary";

type AddProjectProps = {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
	submit: (payload: Project) => Promise<AxiosResponse<Project>>;
};

const AddProjectForm: FC<AddProjectProps> = ({
	isOpen,
	onOpenChange,
	submit,
}) => {
	const { translate } = useLocale();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setValue,
		watch,
		setError,
	} = useForm<Project>({
		defaultValues: {
			technologies: [],
			screenshots: [],
		},
	});
	const onSubmit: SubmitHandler<Project> = async (payload) => {
		const res = await submit(payload);
		const isSuccess = res.status === 201;
		if (isSuccess) {
			reset();
			onOpenChange();
		}
	};

	const onUploadCover = (url: string | undefined) => {
		if (!url) return;
		setValue("coverUrl", url);
	};

	const onUploadScreenshots = (url: string | undefined) => {
		if (!url) return;
		setValue("screenshots", [...(watch("screenshots") || []), url]);
	};

	const FieldErrorMessage = ({ prop }: { prop: keyof Project }) => {
		if (!errors[prop]) return null;
		return (
			<span className="text text-xs text-red-500">
				{translate("addProjectForm.propIsRequired", {
					replace: {
						values: { prop },
						withTranslation: true,
					},
				})}
				{" *"}
			</span>
		);
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
							{...register("name", { required: true })}
						/>
						<FieldErrorMessage prop="name" />
						<Textarea
							label={translate("description")}
							type="text"
							variant="flat"
							{...register("description", {
								required: true,
							})}
						/>
						<FieldErrorMessage prop="description" />

						<UploadToCloudinary
							options={{ maxFiles: 1 }}
							onUploadCover={onUploadCover}
						/>
						<FieldErrorMessage prop="coverUrl" />
						<UploadToCloudinary onUploadScreenshots={onUploadScreenshots} />
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
										key={tech}
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
									if (!newTech || techs.includes(newTech)) return;
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
								{...(register("startedAt", {
									required: true,
								}) as unknown as any)}
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
						<FieldErrorMessage prop="startedAt" />
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
							isDisabled={isSubmitting}
							onClick={() => {
								if (!watch("coverUrl")) {
									setError("coverUrl", { type: "required" });
									return;
								}
							}}
						>
							{translate("addProjectForm.submit", {
								mutate: {
									when: isSubmitting,
									value: "loading",
									withTranslation: true,
									endAdornment: "...",
								},
							})}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default AddProjectForm;
