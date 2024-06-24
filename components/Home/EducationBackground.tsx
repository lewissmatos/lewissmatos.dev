"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { useLocale } from "@/hooks/useLocale";
import { IEducationBackground } from "@/interfaces/app-data.interface";

const EducationBackground = ({
	educationBackground,
}: {
	educationBackground: IEducationBackground[];
}) => {
	const { translate } = useLocale();

	return (
		<section>
			<SectionTitle>{translate("homePage.educationBackground")}</SectionTitle>
			<div className="mt-2 flex flex-col gap-2">
				{educationBackground.map((education) => (
					<div className="flex flex-col mb-4" key={education.institution}>
						<div className="grid grid-cols-1 sm:grid-cols-5 gap-1">
							<span className="sm:text-start font-semibold text-lg sm:text-xl col-span-full sm:col-span-4">
								{`${education.institution}: ${education.degree}`}
							</span>
							<div className="flex flex-row justify-between sm:justify-end">
								<span className="text text-end font-semibold text text-md">
									{education.startDate === education.endDate
										? education.startDate
										: `${education.startDate} - ${education.endDate ?? "Now"}`}
								</span>
							</div>
						</div>
						<div className="text flex flex-col gap-1 mt-2">
							<p className="text text-lg">{education.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default EducationBackground;
