import themeSlice, { PreferencesState, toggleTheme } from "./preferencesSlice";

test("is should toggle the theme value", () => {
	const initialState: PreferencesState = { theme: "light", language: "es-DO" };
	const store = themeSlice(initialState, toggleTheme());

	expect(store.theme).toEqual("dark");
});
