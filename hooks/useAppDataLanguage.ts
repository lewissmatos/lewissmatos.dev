import { AppLanguage } from "@/redux/reducers/preferences/preferencesSlice";
import { portfolioData as portfolioDataEn } from "../public/data/app-data.en";
import { portfolioData as portfolioDataEs } from "../public/data/app-data.es";
import { usePreferencesStore } from "@/store/preferences.store";

const useAppDataLanguage = () => {
	const language = usePreferencesStore((state) => state.language);
	const appData = {
		portfolio: {
			"es-DO": portfolioDataEs,
			"en-US": portfolioDataEn,
		},
	};

	return {
		portfolioData: appData.portfolio[language as AppLanguage],
	};
};

export { useAppDataLanguage };
