import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppLanguage = "en-US" | "es-MX" | null;

interface AuthStore {
	language: AppLanguage;
	setLanguage: (language: AppLanguage) => void;
}

export const usePreferencesStore = create(
	persist<AuthStore>(
		(set) => ({
			language: null,
			setLanguage: (language: AppLanguage) => set({ language }),
		}),
		{
			name: "preferences-store",
		}
	)
);
