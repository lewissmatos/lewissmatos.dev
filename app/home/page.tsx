"use client";
import { Divider } from "@nextui-org/react";
import {
	AboutMe,
	EducationBackground,
	Presentation,
	Skills,
	WorkExperience,
} from "@/components/Home";
import { useAppDataLanguage } from "@/hooks/useAppDataLanguage";

const Resume = () => {
	const { portfolioData } = useAppDataLanguage();
	const {
		fullName,
		role,
		socialLinks,
		aboutMe,
		technicalAboutMe,
		educationBackground,
		workExperience,
		skills,
	} = portfolioData;

	return (
		<div className="flex flex-col gap-4 pb-4">
			<Presentation fullName={fullName} role={role} socialLinks={socialLinks} />
			<Divider />
			<AboutMe aboutMe={aboutMe} technicalAboutMe={technicalAboutMe} />
			<Divider />
			<WorkExperience workExperience={workExperience} />
			<Divider />
			<Skills skills={skills} />
			<Divider />
			<EducationBackground educationBackground={educationBackground} />
		</div>
	);
};

export default Resume;
