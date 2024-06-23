import { AppLanguage, usePreferencesStore } from "@/store/preferences.store";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";

const langGetter = (lang: AppLanguage | undefined) => {
	const _default = "Español";
	if (!lang) return _default;

	const langs = {
		"en-US": "English",
		"es-DO": "Español",
	};
	return langs[lang] || _default;
};
const languages = [
	{ key: "en-US", value: "English" },
	{ key: "es-DO", value: "Español" },
];

const LanguageSelector = () => {
	const language = usePreferencesStore((state) => state.language);
	const setLanguage = usePreferencesStore((state) => state.setLanguage);
	const onChoseLanguage = (lang: AppLanguage) => {
		setLanguage(lang);
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="flat">
					{langGetter(language)}
					<span className="icon-[iconamoon--arrow-down-2-bold]"></span>
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="light">
				{languages.map((lang) => {
					const isSelected = language === lang.key;
					return (
						<DropdownItem
							key={lang.key}
							onClick={async () => {
								onChoseLanguage(lang.key as AppLanguage);
							}}
						>
							<span className={isSelected ? "text font-bold" : ""}>
								{lang.value}
							</span>
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
};

export default LanguageSelector;
