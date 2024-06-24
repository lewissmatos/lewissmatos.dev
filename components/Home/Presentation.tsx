"use client";
import { Avatar } from "@nextui-org/react";
import SocialLink from "./SocialLink";
import profile from "../../public/images/profile.jpeg";
import { ISocialLink } from "@/interfaces/app-data.interface";
import { FC } from "react";
const socialMediaIcons = [
	"icon-[hugeicons--linkedin-01]",
	"icon-[hugeicons--github-01]",
	"icon-[basil--gmail-outline]",
	"icon-[mdi--whatsapp]",
];

type PresentationProps = {
	fullName: string;
	role: string;
	socialLinks: ISocialLink[];
};

const Presentation: FC<PresentationProps> = ({
	fullName,
	role,
	socialLinks,
}) => {
	//TODO
	const downloadPDF = () => {
		const link = document.createElement("a");
		link.href = "/profile.jpeg";
		link.download = "Res.jpeg";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<section>
			<div className="flex flex-col sm:flex-row justify-between">
				<section
					className="flex flex-col sm:flex-row sm:gap-4 gap-1 items-center mt-4"
					id="information"
				>
					<Avatar src={profile.src} className="w-24 h-24 text-large" />
					<div className="flex flex-col text-center sm:text-start gap-1">
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold">
							{fullName}
						</h1>
						<h3 className="text-xl sm:text-1xl md:text-3xl">{role}</h3>
					</div>
				</section>
				<section
					className="flex flex-row sm:flex-col gap-3 justify-center sm:items-end mt-3"
					id="social-links"
				>
					{socialLinks.map((link, index) => (
						<SocialLink
							key={link.label}
							link={link}
							socialMediaIconClass={socialMediaIcons[index]}
						/>
					))}
				</section>
			</div>
		</section>
	);
};

export default Presentation;
