import { IRole } from "./role.interface";

export interface IUser {
	id: string;
	name: string;
	email: string;
	roleId: number;
	role?: IRole;
	authMethod: string;
	avatarUrl: string;
}

export interface IUserSchema {
	user_id: string;
	full_name: string;
	email: string;
	role_id: number;
	auth_method: string;
	avatar_url: string;
	role?: any;
}
