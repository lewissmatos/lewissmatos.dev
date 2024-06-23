"use server";

import { AppLanguage } from "@/redux/reducers/preferences/preferencesSlice";
import { cookies } from "next/headers";

export async function setServerLanguage(lang: AppLanguage) {
	try {
		const cookieStore = cookies();
		cookieStore.set("lang", lang);
	} catch (e) {
		console.error(e);
	}
}
