import { Divider } from "@nextui-org/react";
import {
	AboutMe,
	EducationBackground,
	Presentation,
	Skills,
	WorkExperience,
} from "@/components/Home";

const Resume = () => {
	return (
		<div className="flex flex-col gap-4 pb-4">
			<Presentation />
			<Divider />
			<AboutMe />
			<Divider />
			<WorkExperience />
			<Divider />
			<Skills />
			<Divider />
			<EducationBackground />
		</div>
	);
};

export default Resume;
