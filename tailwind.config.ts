// tailwind.config.js
import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind");
const { nextui } = require("@nextui-org/theme");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/components/[object Object].js",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/(app|pages|components|hooks)/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			opacity: ["group-hover"],
		},
	},
	plugins: [
		nextui({
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: "#FFFFFF",
							foreground: "#000000",
						},
						focus: "#FFFFFF",
					},
				},
				light: {
					colors: {
						primary: {
							DEFAULT: "#000000",
							foreground: "#FFFFFF",
						},
						focus: "#000000",
					},
				},
			},
		}),
		addDynamicIconSelectors({
			// specify the icon sets you want to use
			families: {
				yesicon: true,
			},
		}),
	],
};
export default config;
