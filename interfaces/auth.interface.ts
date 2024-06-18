interface ILogin {
	email: string;
	password: string;
}
interface ISignUp {
	name: string;
	email: string;
	password: string;
	authMethod?: string;
	roleId?: number;
}

export type { ILogin, ISignUp };
