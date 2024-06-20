"use client";
import { useLocale } from "@/hooks/useLocale";
import { IUser } from "@/interfaces/user.interface";
import useAuthService from "@/useServices/useAuthService";
import {
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import React, { FC } from "react";

type AuthHandlerMenuProps = {
	onLoginOpen: () => void;
	onSignUpOpen: () => void;
	user?: IUser;
};
const AuthHandlerMenu: FC<AuthHandlerMenuProps> = ({
	onLoginOpen,
	onSignUpOpen,
	user,
}) => {
	const { translate } = useLocale();
	const isAdmin = user?.role?.name === "admin";
	const { signOut } = useAuthService();
	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					variant={isAdmin ? "solid" : "flat"}
					color={isAdmin ? "primary" : "default"}
				>
					{isAdmin && (
						<span className="icon-[material-symbols--admin-panel-settings-outline-rounded] text text-lg "></span>
					)}
					{user
						? user.name?.split(" ")?.[0]
						: translate("authHandlerMenu.account")}
					<span className="icon-[iconamoon--arrow-down-2-bold]"></span>
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="light">
				{Boolean(user) ? (
					<DropdownItem key="logout" onClick={signOut}>
						<span>{translate("authHandlerMenu.logout")}</span>
					</DropdownItem>
				) : (
					[
						<DropdownItem key="login" onClick={onLoginOpen}>
							<span>{translate("authHandlerMenu.login")}</span>
						</DropdownItem>,
						<DropdownItem key="signUp" onClick={onSignUpOpen}>
							<span>{translate("authHandlerMenu.signUp")}</span>
						</DropdownItem>,
					]
				)}
			</DropdownMenu>
		</Dropdown>
	);
};

export default AuthHandlerMenu;
