import { Link } from "@nextui-org/react";
import React, { FC } from "react";
import { ISocialLink } from "@/interfaces/app-data.interface";
import { useTheme } from "next-themes";

type SocialLinkProps = {
	link: ISocialLink;
	socialMediaIconClass: string;
};

const SocialLink: FC<SocialLinkProps> = ({ link, socialMediaIconClass }) => {
	const { theme } = useTheme();

	const isDarkModeEnabled = theme === "dark";
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
