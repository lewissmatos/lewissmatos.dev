import { Button } from "@nextui-org/react";
import { RootState, useAppSelector } from "@/redux/appStore";
import { toggleTheme } from "@/redux/reducers/preferences/preferencesSlice";
import { useDispatch } from "react-redux";

const ThemeToggler = () => {
	const dispatch = useDispatch();
	const theme = useAppSelector((state: RootState) => state.preferences.theme);
	const handleClick = () => {
		dispatch(toggleTheme());
	};

	return (
		<Button isIconOnly onClick={handleClick} size="md" variant="flat">
			{theme === "dark" ? (
				<span className="text text-lg icon-[ic--twotone-dark-mode]"></span>
			) : (
				<span className="text text-lg icon-[ic--twotone-light-mode]"></span>
			)}
		</Button>
	);
};

export default ThemeToggler;
