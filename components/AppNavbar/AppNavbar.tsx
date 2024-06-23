"use client";
import React, { FC } from "react";
import ThemeToggler from "../Preferences/ThemeToggler";
import {
	Navbar,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarContent,
	NavbarItem,
	LinkProps,
	NavbarBrand,
	useDisclosure,
} from "@nextui-org/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "../Preferences/LanguageSelector";
import { useLocale } from "@/hooks/useLocale";
import AuthHandlerMenu from "../Auth/AuthHandlerMenu";
import LoginForm from "../Auth/LoginForm";
import SignUpForm from "../Auth/SignUpForm";
import { _User, useAuthStore } from "@/store/auth.store";

type NavLinkProps = {
	href: string;
	label: string;
} & LinkProps;
const NavLink: FC<NavLinkProps> = ({ href, label }) => {
	const isSelected = usePathname().includes(href);
	return (
		<Link
			href={`/${href}`}
			className={`${
				isSelected
					? "font-bold text-md sm:text-xl transition-all duration-300 "
					: "text-gray-500 text-md sm:text-md "
			} cursor-pointer "`}
		>
			{label}
		</Link>
	);
};

const menuItems: string[] = ["home", "projects", "blog"];
const AppNavbar = () => {
	// const { user } = useAppSelector((state: RootState) => state.auth!);
	const user = useAuthStore((state) => state.user);

	const { translate } = useLocale();
	const {
		isOpen: isLoginOpen,
		onOpen: onLoginOpen,
		onOpenChange: onLoginOpenChange,
	} = useDisclosure();
	const {
		isOpen: isSignUpOpen,
		onOpen: onSignUpOpen,
		onOpenChange: onSignUpOpenChange,
	} = useDisclosure();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<>
			<LoginForm
				isOpen={isLoginOpen}
				onOpen={onLoginOpen}
				onOpenChange={onLoginOpenChange}
			/>
			<SignUpForm
				isOpen={isSignUpOpen}
				onOpen={onSignUpOpen}
				onOpenChange={onSignUpOpenChange}
			/>
			<Navbar
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				classNames={{ wrapper: "px-2 sm:px-0" }}
				position="sticky"
				className="fixed top-0 z-50 layout-padding"
				maxWidth="full"
			>
				<NavbarContent className="sm:hidden" justify="start">
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					/>
					<NavbarBrand>
						<NavbarItem>
							<Link href="/home">
								<span className="font-bold text-md mr-3 cursor-pointer">
									lewissmatos.dev
								</span>
							</Link>
						</NavbarItem>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent
					className="hidden sm:flex justify-center"
					justify="start"
				>
					<NavbarBrand>
						<NavbarItem>
							<Link href="/home">
								<span className="font-bold text-md md:text-xl mr-3 cursor-pointer">
									lewissmatos.dev
								</span>
							</Link>
						</NavbarItem>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent
					className="hidden sm:flex justify-center gap-4 "
					justify="center"
				>
					{menuItems.map((item, index) => (
						<NavbarItem key={`${item}-${index}`}>
							<NavLink href={item} label={translate(`navbar.${item}`)} />
						</NavbarItem>
					))}
				</NavbarContent>
				<NavbarContent className=" sm:flex justify-center gap-3" justify="end">
					<NavbarItem>
						<ThemeToggler />
					</NavbarItem>
					<NavbarItem className="hidden sm:flex">
						<LanguageSelector />
					</NavbarItem>
					<NavbarItem className="hidden sm:flex">
						<AuthHandlerMenu
							onLoginOpen={onLoginOpen}
							onSignUpOpen={onSignUpOpen}
							user={user as _User | undefined}
						/>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu className="flex flex-col justify-between">
					<div>
						{menuItems.map((item, index) => (
							<NavbarMenuItem
								key={`${item}-${index}`}
								onClick={() => setIsMenuOpen(false)}
							>
								<NavLink href={item} label={translate(`navbar.${item}`)} />
							</NavbarMenuItem>
						))}
					</div>
					<div className="flex flex-col gap-2 items-end mb-6">
						<NavbarItem>
							<LanguageSelector />
						</NavbarItem>
						<NavbarItem>
							<AuthHandlerMenu
								onLoginOpen={onLoginOpen}
								onSignUpOpen={onSignUpOpen}
								user={user as _User | undefined}
							/>
						</NavbarItem>
					</div>
				</NavbarMenu>
			</Navbar>
		</>
	);
};

export default AppNavbar;
