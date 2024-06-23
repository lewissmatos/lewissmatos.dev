import { Role, User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type _User = User & { role: Role };
interface AuthStore {
	user: _User | null;
	session: { accessToken: string } | null;
	setUser: (user: _User) => void;
	setSession: (session: { accessToken: string }) => void;
	setAuth: (auth: {
		user: _User | null;
		session: { accessToken: string } | null;
	}) => void;
}

export const useAuthStore = create(
	persist<AuthStore>(
		(set) => ({
			user: null,
			session: null,
			setUser: (user: _User) => set({ user }),
			setSession: (session: { accessToken: string }) => set({ session }),
			setAuth: (auth: {
				user: _User | null;
				session: { accessToken: string } | null;
			}) => set(auth),
		}),
		{
			name: "auth-store",
		}
	)
);
