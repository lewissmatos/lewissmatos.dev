export interface IRole {
	id: number;
	name: string;
	permissions: string[];
}

export interface IRoleSchema {
	role_id: number;
	name: string;
	permissions: string[];
}
