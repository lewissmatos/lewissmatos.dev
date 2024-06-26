import { useLocale } from "@/hooks/useLocale";
import { usePreferencesStore } from "@/store/preferences.store";
import { act } from "react";
import { renderHook } from "@testing-library/react";

describe("useLocale", () => {
	beforeEach(() => {
		act(() => usePreferencesStore.setState({ language: null }, true));
	});

	it("should return the key if it doesn't find a translation", () => {
		act(() => usePreferencesStore.setState({ language: "en-US" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(locale.current.translate("anythingNonExistent")).toEqual(
			"anythingNonExistent"
		);
	});

	it("should set the language to es-MX if it's not language", () => {
		act(() => usePreferencesStore.setState({ language: null }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(locale.current.translate("name")).toEqual("Nombre");
	});

	it("should return the translated key in english", () => {
		act(() => usePreferencesStore.setState({ language: "en-US" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(locale.current.translate("name")).toEqual("Name");
	});

	it("should return the translated key in spanish", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(locale.current.translate("name")).toEqual("Nombre");
	});

	it("should render the full translated key if the key has a dot", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(locale.current.translate("addProjectForm.title")).toEqual(
			"Agregar proyecto"
		);
	});

	it("should render a uppercase translated key if the options has uppercase", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(
			locale.current.translate("addProjectForm.title", { uppercase: true })
		).toEqual("Agregar proyecto".toUpperCase());
	});

	it("should render a lowercase translated key if the options has uppercase", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(
			locale.current.translate("addProjectForm.title", { lowercase: true })
		).toEqual("Agregar proyecto".toLowerCase());
	});

	it("should render a lowercase translated key if the options has uppercase", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(
			locale.current.translate("addProjectForm.title", { lowercase: true })
		).toEqual("Agregar proyecto".toLowerCase());
	});

	it("should render a replaced translated key if the options has uppercase", () => {
		act(() => usePreferencesStore.setState({ language: "es-MX" }, true));
		const { result: locale } = renderHook(() => useLocale());
		expect(
			locale.current.translate("addProjectForm.propIsRequired", {
				replace: { values: { prop: "name" }, withTranslation: true },
			})
		).toEqual("'Nombre' es requerido");
	});
});
