"use client";
import { useAppSelector, RootState } from "@/redux/appStore";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

export default function NextUIProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	const theme = useAppSelector((state: RootState) => state.preferences.theme);

	return (
		<NextUIProvider>
			<ThemeProvider attribute="class" defaultTheme={theme}>
				{children}
			</ThemeProvider>
		</NextUIProvider>
	);
}
