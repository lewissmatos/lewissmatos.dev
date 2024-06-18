"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { useAppDataLanguage } from "@/hooks/useAppDataLanguage";
import { useLocale } from "@/hooks/useLocale";

const Skills = () => {
	const { portfolioData } = useAppDataLanguage();
	const { translate } = useLocale();
	return (
		<section>
			<SectionTitle>{translate("homePage.skills")}</SectionTitle>
			<div className="flex flex-col gap-1 mt-2">
				{portfolioData.skills.map((skill) => (
					<li key={skill.tag} className="text-lg">
						<span className="text font-semibold">{`${skill.tag}: `}</span>
						<span className="text ">{skill.skills.join(", ")}</span>.
					</li>
				))}
			</div>
		</section>
	);
};

export default Skills;
