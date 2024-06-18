const toggleDarkMode = () => {
	if (typeof window !== "undefined") {
		document.documentElement.classList.toggle("dark");
	}
};
function isDarkModeEnabled() {
	return document.documentElement.classList.contains("dark");
}
export { toggleDarkMode, isDarkModeEnabled };
