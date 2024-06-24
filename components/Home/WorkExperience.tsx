"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { Tooltip } from "@nextui-org/react";
import { useLocale } from "@/hooks/useLocale";
import { IWorkExperience } from "@/interfaces/app-data.interface";

const WorkExperience = ({
	workExperience,
}: {
	workExperience: IWorkExperience[];
}) => {
	const { translate } = useLocale();
	return (
		<section>
			<SectionTitle>{translate("homePage.workExperience")}</SectionTitle>
			<div className="mt-3">
				{workExperience.map((job) => (
					<div className="flex flex-col mb-4" key={job.roleTitle}>
						<div className="grid grid-cols-1 sm:grid-cols-5 gap-1">
							<span className="sm:text-start font-semibold text-lg sm:text-xl col-span-full sm:col-span-4">
								{job.roleTitle}
							</span>
							<span className="sm:text-start font-semibold text-sm sm:text-lg col-span-full sm:col-span-4">
								{job.company}
							</span>
							<div className="flex flex-row justify-between sm:justify-end text-sm sm:text-lg">
								<span className="sm:hidden flex flex-row gap-1 text text-md">
									{job.counties.join(" / ")}.
								</span>

								<span className="text text-end font-semibold text text-md">
									<Tooltip
										content={
											<div className="flex flex-col gap-1 text text-md ">
												{job.counties.map((county, index) => (
													<span className="text" key={`${county} - ${index}`}>
														{county}
													</span>
												))}
											</div>
										}
									>
										{job.startDate === job.endDate
											? job.startDate
											: `${job.startDate} - ${job.endDate ?? "Now"}`}
									</Tooltip>
								</span>
							</div>
						</div>
						<div className="text flex flex-col gap-1 mt-2">
							{job.responsibilities.map((responsibility) => (
								<li className="text text-lg" key={responsibility}>
									{responsibility}
								</li>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default WorkExperience;
