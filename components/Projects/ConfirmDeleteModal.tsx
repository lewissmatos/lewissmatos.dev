import React, { FC } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";
import { useLocale } from "@/hooks/useLocale";
import { Project } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
type ConfirmDeleteModalProps = {
	project: Project;
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
	onConfirm: () => void;
	onCancel: () => void;
};
const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
	isOpen,
	onOpenChange,
	onConfirm,
	onCancel,
	project,
}) => {
	const { translate } = useLocale();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
		setValue,
	} = useForm<{ name: string }>();

	const onSubmit: SubmitHandler<{ name: string }> = async () => {
		await onConfirm();
		reset();
		onOpenChange();
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
			<ModalContent>
				{(onClose) => (
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader className="flex flex-col gap-1">
							{translate("deleteProjectModal.title")}
						</ModalHeader>
						<ModalBody>
							<p className="text-sm">
								{translate("deleteProjectModal.description")}
							</p>
							<p className="text-sm">{`" ${project?.name} "`}</p>
							<Input
								placeholder={translate("deleteProjectModal.inputPlaceholder")}
								className="w-full"
								color={errors.name ? "danger" : "default"}
								{...register("name", { required: "Name is required" })}
								value={watch("name")}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								isLoading={isSubmitting}
								onClick={onConfirm}
								className="hover:bg-white hover:text-black"
								isDisabled={watch("name") !== project?.name || isSubmitting}
								type="submit"
							>
								{translate("deleteProjectModal.confirm", {
									mutate: {
										when: isSubmitting,
										value: "loading",
										withTranslation: true,
										endAdornment: "...",
									},
								})}
							</Button>
							<Button
								isDisabled={isSubmitting}
								className="hover:bg-red-500 hover:text-white"
								onClick={onCancel}
							>
								{translate("deleteProjectModal.cancel")}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ConfirmDeleteModal;
