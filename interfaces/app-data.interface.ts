export interface ISocialLink {
	label: string;
	url: string;
	colors: {
		darkMode: string;
		lightMode: string;
	};
	iconClass: string;
}

export interface IWorkExperience {
	roleTitle: string;
	company: string;
	responsibilities: string[];
	counties: string[];
	startDate: string;
	endDate: string | null;
}

export interface ISkill {
	tag: string;
	skills: string[];
}

export interface IEducationBackground {
	degree: string;
	institution: string;
	startDate: string;
	endDate: string | null;
	description: string;
}
