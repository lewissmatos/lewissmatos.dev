import { usePreferencesStore } from "@/store/preferences.store";
import { act } from "react";

jest.mock("zustand/middleware", () => ({
	persist: (config: any) => config,
}));

describe("usePreferencesStore", () => {
	afterEach(() => {
		act(() => {
			usePreferencesStore.setState(
				{
					language: null,
				},
				true
			);
		});
	});

	it("should have initial state with language as null", () => {
		const state = usePreferencesStore.getState();
		expect(state.language).toBeNull();
	});

	it("should update language as en-US", () => {
		act(() => usePreferencesStore.setState({ language: "en-US" }, true));
		const state = usePreferencesStore.getState();
		expect(state.language).toEqual("en-US");
	});

	it("should update both language as es-MX", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const state = usePreferencesStore.getState();
		expect(state.language).toEqual("es-MX");
	});
});
