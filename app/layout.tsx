import type { Metadata } from "next";
import "./globals.scss";
import localFont from "next/font/local";
import AppNavbar from "@/components/AppNavbar/AppNavbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
const myFont = localFont({
	src: "../public/fonts/PlayfairDisplay-VariableFont_wght.ttf",
});

export const metadata: Metadata = {
	title: "Lewis S. Matos",
	description: "Official website of Lewis S. Matos",
	applicationName: "Lewis S. Matos Site",
	keywords: [
		"Lewis S. Matos",
		"Lewis Matos",
		"Lewis",
		"Matos",
		"lewissmatos",
		"lewis-matos",
		"lewis-s-matos",
		"lewis-s-matos-site",
		"lewis-matos-site",
		"lewissmatos-site",
		"lewis-s-matos-site",
	],
	creator: "Lewis S. Matos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${myFont.className} flex flex-col min-h-screen`}>
				<ThemeProvider attribute="class">
					<Toaster position="bottom-center" />
					<nav>
						<AppNavbar />
					</nav>
					<main style={{ overflowY: "auto" }} className="mt-20 flex-grow">
						<NextUIProvider>{children}</NextUIProvider>
					</main>
					<footer>
						<Footer />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
