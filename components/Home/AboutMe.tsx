"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { useLocale } from "@/hooks/useLocale";
import { useAppDataLanguage } from "@/hooks/useAppDataLanguage";

const AboutMe = () => {
	const { translate } = useLocale();
	const { portfolioData } = useAppDataLanguage();
	return (
		<section>
			<SectionTitle>{translate("homePage.whoAmI")}</SectionTitle>
			<div className="text flex flex-col gap-2 mt-2">
				<p className="text text-lg">{portfolioData.aboutMe}</p>
				<p className="text text-lg">{portfolioData.technicalAboutMe}</p>
			</div>
		</section>
	);
};

export default AboutMe;
