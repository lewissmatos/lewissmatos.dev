import englishLocaleData from "../public/locales/en.locale.json";
import spanishLocaleData from "../public/locales/es.locale.json";
import { AppLanguage, usePreferencesStore } from "@/store/preferences.store";

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
	let language: AppLanguage =
		currentLang || usePreferencesStore((state) => state.language);

	const translate = (key: string, options?: LocaleOptions) => {
		if (!language) {
			language = "es-MX";
		}
		const localeData =
			language === "en-US" ? englishLocaleData : spanishLocaleData;

		const locale = getKey(key, localeData);

		const value =
			(options ? formatLocaleValue(locale, options) : locale) || key;
		return value;
	};

	const getKey = (key: string, localeData: {}): string => {
		if (!key) {
			return "";
		}

		if (!key.includes(".")) {
			return localeData[key as keyof {}] || key;
		}
		return (
			key
				?.split(".")
				?.reduce((acc, cur) => acc?.[cur as keyof {}], localeData)
				?.toString() || key
		);
	};

	const formatLocaleValue = (
		value: string,
		options: LocaleOptions = {}
	): string => {
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

	return { translate };
};

export { useLocale };
