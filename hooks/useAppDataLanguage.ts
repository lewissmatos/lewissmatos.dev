import { AppLanguage } from "@/redux/reducers/preferences/preferencesSlice";
import { portfolioData as portfolioDataEn } from "../public/data/app-data.en";
import { portfolioData as portfolioDataEs } from "../public/data/app-data.es";
import { useAppSelector } from "@/redux/appStore";

const useAppDataLanguage = () => {
	const lang = useAppSelector((state) => state.preferences.language);
	const appData = {
		portfolio: {
			"es-DO": portfolioDataEs,
			"en-US": portfolioDataEn,
		},
	};

	return {
		portfolioData: appData.portfolio[lang as AppLanguage],
	};
};

export { useAppDataLanguage };
