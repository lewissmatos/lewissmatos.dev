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
import { IUser } from "@/interfaces/user.interface";
import { useAppSelector, RootState } from "@/redux/appStore";

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
					? "font-bold text-xl transition-all duration-300 "
					: "text-gray-500"
			} cursor-pointer`}
		>
			{label}
		</Link>
	);
};

const menuItems: string[] = ["home", "projects", "blog"];
const AppNavbar = () => {
	const { user, session } = useAppSelector((state: RootState) => state.auth!);

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
							<Link href="home">
								<span className="font-bold text-lg mr-3 cursor-pointer">
									lewissmatos.dev
								</span>
							</Link>
						</NavbarItem>
						<p className="font-bold text-lg mr-3"></p>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent
					className="hidden sm:flex justify-center"
					justify="start"
				>
					<NavbarBrand>
						<NavbarItem>
							<Link href="home">
								<span className="font-bold text-lg mr-3 cursor-pointer">
									lewissmatos.dev
								</span>
							</Link>
						</NavbarItem>
						<p className="font-bold text-lg mr-3"></p>
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
					<NavbarItem>
						<LanguageSelector />
					</NavbarItem>
					<NavbarItem>
						<AuthHandlerMenu
							onLoginOpen={onLoginOpen}
							onSignUpOpen={onSignUpOpen}
							user={user as IUser | undefined}
						/>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem
							key={`${item}-${index}`}
							onClick={() => setIsMenuOpen(false)}
						>
							<NavLink
								href={item}
								label={translate(`navbar.${item}`)}
								className="w-full"
							/>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
		</>
	);
};

export default AppNavbar;
