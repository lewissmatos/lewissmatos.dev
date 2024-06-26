// themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleDarkMode } from "@/utils/ui.util";

export type AppTheme = "light" | "dark";
export type AppLanguage = "en-US" | "es-MX";
export interface PreferencesState {
	theme: AppTheme;
	language: AppLanguage;
}

const initialState: PreferencesState = {
	theme: "light",
	language: "es-MX",
};

export const preferencesSlice = createSlice({
	name: "preferences",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === "light" ? "dark" : "light";
			toggleDarkMode();
		},
		setTheme: (state, action: PayloadAction<AppTheme>) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action: PayloadAction<AppLanguage>) => {
			state.language = action.payload;
		},
	},
});

export const { toggleTheme, setTheme, setLanguage } = preferencesSlice.actions;

export default preferencesSlice.reducer;
