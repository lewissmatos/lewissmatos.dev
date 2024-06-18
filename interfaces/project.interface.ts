export interface IProject {
	id: number;
	name: string;
	coverUrl: string;
	screenshots: string[];
	description: string;
	technologies: string[];
	url: string;
	repoUrl: string;
}

export interface IProjectSchema {
	project_id: number;
	name: string;
	cover_url: string;
	screenshots: string[];
	description: string;
	technologies: string[];
	url: string;
	repo_url: string;
}
