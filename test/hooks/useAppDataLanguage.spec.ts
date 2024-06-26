import { AppLanguage, usePreferencesStore } from "@/store/preferences.store";
import { act } from "react";

import { portfolioData as portfolioDataEn } from "../../public/data/app-data.en";
import { portfolioData as portfolioDataEs } from "../../public/data/app-data.es";
import { renderHook } from "@testing-library/react";
import { useAppDataLanguage } from "@/hooks/useAppDataLanguage";

describe("useAppDataLanguage", () => {
	beforeEach(() => {
		act(() => {
			usePreferencesStore.setState(
				{
					language: null,
				},
				true
			);
		});
	});

	it("should return portfolio data in english", () => {
		act(() => usePreferencesStore.setState({ language: "en-US" }, true));
		const { result: appDataLanguage } = renderHook(() => useAppDataLanguage());
		expect(appDataLanguage.current.portfolioData).toEqual(portfolioDataEn);
	});

	it("should return portfolio data in spanish", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const { result: appDataLanguage } = renderHook(() => useAppDataLanguage());
		expect(appDataLanguage.current.portfolioData).toEqual(portfolioDataEs);
	});
});
