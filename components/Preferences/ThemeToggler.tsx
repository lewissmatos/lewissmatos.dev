import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
	const { theme, setTheme } = useTheme();
	return (
		<Button
			isIconOnly
			onClick={() => {
				setTheme(theme === "dark" ? "light" : "dark");
			}}
			size="md"
			variant="flat"
		>
			{theme === "dark" ? (
				<span className="text text-lg icon-[ic--twotone-dark-mode]"></span>
			) : (
				<span className="text text-lg icon-[ic--twotone-light-mode]"></span>
			)}
		</Button>
	);
};

export default ThemeToggler;
