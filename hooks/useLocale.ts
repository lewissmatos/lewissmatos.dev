import { AppLanguage } from "@/redux/reducers/preferences/preferencesSlice";
import englishLocaleData from "../public/locales/en.locale.json";
import spanishLocaleData from "../public/locales/es.locale.json";
import { useAppSelector } from "@/redux/appStore";

export type LocaleOptions = {
	capitalize?: boolean;
	uppercase?: boolean;
	lowercase?: boolean;
	replace?: {
		values: { [key: string]: string | number };
		withTranslation?: boolean;
	};
	mutate?: {
		when: boolean;
		value: string;
		withTranslation?: boolean;
		endAdornment?: string;
	};
};
const useLocale = (currentLang?: AppLanguage) => {
	const language: AppLanguage =
		currentLang || useAppSelector((state) => state.preferences.language);

	const translate = (key: string, options?: LocaleOptions) => {
		const localeData =
			language === "en-US" ? englishLocaleData : spanishLocaleData;

		const locale = getKey(key, localeData);

		const value =
			(options ? formatLocaleValue(locale, options) : locale) || key;
		return value;
	};

	return { translate };
};

export const getKey = (key: string, localeData: {}): string => {
	if (!key) {
		return "";
	}

	if (!key.includes(".")) {
		return localeData[key as keyof {}];
	}
	return key
		?.split(".")
		?.reduce((acc, cur) => acc?.[cur as keyof {}], localeData)
		?.toString();
};

export const formatLocaleValue = (
	value: string,
	options: LocaleOptions = {}
): string => {
	const { translate } = useLocale();
	if (options.capitalize) {
		value = value.charAt(0).toUpperCase() + value.slice(1);
	}

	if (options.uppercase) {
		value = value.toUpperCase();
	}

	if (options.lowercase) {
		value = value.toLowerCase();
	}

	if (options.replace) {
		let replacedValue = value;
		Object.entries(options.replace.values).forEach(([key, value]) => {
			const mustTranslate = options.replace?.withTranslation || false;
			const finalValue = mustTranslate
				? translate(value?.toString())
				: value?.toString();
			replacedValue = replacedValue?.replace(
				new RegExp(`{${key}}`, "g"),
				finalValue
			);
		});
		value = replacedValue;
	}

	if (options.mutate) {
		const {
			when,
			value: newValue,
			withTranslation,
			endAdornment,
		} = options.mutate;
		if (when) {
			value = `${withTranslation ? translate(newValue) : newValue}${
				endAdornment ?? ""
			} `;
		}
	}

	return value;
};

export { useLocale };
