import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppNavbar, { menuItems } from "@/components/AppNavbar/AppNavbar";
import { useRouter } from "next/router";
// Mock the useRouter hook
jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

// Mock usePathname from "next/navigation"
jest.mock("next/navigation", () => ({
	usePathname: jest.fn(() => "/some-path"),
}));

const mockUseRouter = {
	pathname: "/",
	query: {},
	asPath: "/",
	push: jest.fn(),
	prefetch: jest.fn(),
	replace: jest.fn(),
	reload: jest.fn(),
};

describe("AppNavbar", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockImplementation(() => mockUseRouter);
	});
	it("should render the navbar brand", () => {
		const appNavbarBrandText = "lewissmatos.dev";
		render(<AppNavbar />);
		const navbarBrand = screen.getByTestId("navbar-brand").textContent;
		expect(navbarBrand).toEqual(appNavbarBrandText);
	});

	it("should render the navbar links", () => {
		render(<AppNavbar />);
		menuItems.forEach((item) => {
			const navbarLink = screen.getByTestId(`navbar-${item}`);
			expect(navbarLink).toBeInTheDocument();
		});
	});
});
