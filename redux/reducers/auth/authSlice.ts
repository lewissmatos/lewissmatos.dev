// themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/interfaces/user.interface";

export interface Session {
	accessToken: string;
	remainingTime?: number;
}
export interface AuthState {
	user: IUser | null;
	session: Session | null;
}

const initialState: AuthState = {
	user: null,
	session: null,
};

export const preferencesSlice = createSlice({
	name: "preferences",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload;
		},
		setSession: (state, action: PayloadAction<Session | null>) => {
			state.session = action.payload;
		},
		setAuth: (state, action: PayloadAction<AuthState | null>) => {
			if (!action.payload) {
				state.user = null;
				state.session = null;
				return;
			}
			const { user, session } = action.payload as AuthState;
			state.user = user;
			state.session = session;
		},
	},
});

export const { setUser, setSession, setAuth } = preferencesSlice.actions;

export default preferencesSlice.reducer;
