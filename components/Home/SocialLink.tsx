import { Link } from "@nextui-org/react";
import React, { FC } from "react";
import { RootState, useAppSelector } from "@/redux/appStore";
import { ISocialLink } from "@/interfaces/app-data.interface";

type SocialLinkProps = {
	link: ISocialLink;
	socialMediaIconClass: string;
};

const SocialLink: FC<SocialLinkProps> = ({ link, socialMediaIconClass }) => {
	const isDarkModeEnabled =
		useAppSelector((state: RootState) => state.preferences.theme) === "dark";
	return (
		<Link
			style={{
				color: isDarkModeEnabled ? link.colors.darkMode : link.colors.lightMode,
			}}
			showAnchorIcon
			href={link.url}
			target="_blank"
			rel="noreferrer"
		>
			<span className={`${socialMediaIconClass} sm:hidden text-lg`}></span>
			<span className="lg:flex hidden sm:flex">{link.label}</span>
		</Link>
	);
};

export default SocialLink;
