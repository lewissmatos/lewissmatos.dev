"use server";

import { cookies } from "next/headers";
import englishLocaleData from "../public/locales/en.locale.json";
import spanishLocaleData from "../public/locales/es.locale.json";
import { AppLanguage } from "@/redux/reducers/preferences/preferencesSlice";
import { formatLocaleValue, getKey } from "@/hooks/useLocale";

function getServerLanguage(): AppLanguage {
	const cookieStore = cookies();
	return (
		cookieStore.get("lang") ? cookieStore.get("lang")!.value : "en-US"
	) as AppLanguage;
}

export type LocaleOptions = {
	capitalize?: boolean;
	uppercase?: boolean;
	lowercase?: boolean;
	replace?: { [key: string]: string | number };
};

const sTranslate = (key: string, options?: LocaleOptions) => {
	const localeData =
		getServerLanguage() === "en-US" ? englishLocaleData : spanishLocaleData;

	const locale = getKey(key, localeData);

	const value = (options ? formatLocaleValue(locale, options) : locale) || key;
	return value;
};

export { sTranslate, getServerLanguage };
