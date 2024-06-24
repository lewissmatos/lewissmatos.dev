"use client";
import React, { FC } from "react";
import SectionTitle from "./SectionTitle";
import { useLocale } from "@/hooks/useLocale";

type AboutMeProps = {
	aboutMe: string;
	technicalAboutMe: string;
};
const AboutMe: FC<AboutMeProps> = ({ aboutMe, technicalAboutMe }) => {
	const { translate } = useLocale();
	return (
		<section>
			<SectionTitle>{translate("homePage.whoAmI")}</SectionTitle>
			<div className="text flex flex-col gap-2 mt-2">
				<p className="text text-lg">{aboutMe}</p>
				<p className="text text-lg">{technicalAboutMe}</p>
			</div>
		</section>
	);
};

export default AboutMe;
