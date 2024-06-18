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
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "@/interfaces/auth.interface";
import useAuthService from "@/useServices/useAuthService";

type LoginFormProps = {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
};
const LoginForm: FC<LoginFormProps> = ({ isOpen, onOpenChange }) => {
	const { translate } = useLocale();
	const { login } = useAuthService();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ILogin>();

	const onSubmit: SubmitHandler<ILogin> = async ({ email, password }) => {
		const isOk = await login({ email, password });
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
							{translate("authHandlerMenu.login")}
						</ModalHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
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
									color={errors.email ? "danger" : "default"}
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
										? translate("authHandlerMenu.login")
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

export default LoginForm;
