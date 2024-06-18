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
import { useForm, SubmitHandler } from "react-hook-form";
import { ISignUp } from "@/interfaces/auth.interface";
import { useAxiosInstance } from "@/useServices/useAxiosInstance";
import useAuthService from "@/useServices/useAuthService";
import toast from "react-hot-toast";

export type SignUpMethod = "email" | "google";

type SignUpFormProps = {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
};

const SignUpForm: FC<SignUpFormProps> = ({ isOpen, onOpenChange }) => {
	const { translate } = useLocale();
	const { signUp } = useAuthService();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ISignUp>();

	const onSubmit: SubmitHandler<ISignUp> = async ({
		name,
		email,
		password,
	}) => {
		const isOk = await signUp({ name, email, password });
		if (isOk) {
			reset();
			onOpenChange();
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
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{translate("authHandlerMenu.signUp")}
						</ModalHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
								<Input
									autoFocus
									label={translate("name")}
									variant="flat"
									{...register("name", { required: "Name is required" })}
								/>
								<Input
									label={translate("email")}
									type="email"
									variant="flat"
									color={errors.email ? "danger" : "default"}
									{...register("email", { required: "Email is required" })}
								/>
								<Input
									label={translate("password")}
									type="password"
									variant="flat"
									color={errors.password ? "danger" : "default"}
									{...register("password", {
										required: "Password is required",
									})}
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
										? translate("authHandlerMenu.signUp")
										: `${translate("loading")}...`}
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default SignUpForm;
