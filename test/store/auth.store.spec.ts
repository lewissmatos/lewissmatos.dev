import { _User, useAuthStore } from "@/store/auth.store";
import { act } from "react";

jest.mock("zustand/middleware", () => ({
	persist: (config: any) => config,
}));

const mockUser: _User = {
	id: "6671cf242cd1b02fa81e7955",
	name: "Lewis S. Matos",
	email: "lewissmatos@gmail.com",
	password: "xxx",
	createdAt: new Date("2024-06-18T18:17:08.846Z"),
	avatarUrl: null,
	roleId: "6671a576b36bfe701add5d3a",
	role: {
		id: "6671a576b36bfe701add5d3a",
		name: "admin",
	},
};
const mockSession = {
	accessToken: "mockAccessToken",
};

describe("useAuthStore", () => {
	afterEach(() => {
		act(() => {
			useAuthStore.setState({ user: null, session: null }, true);
		});
	});

	it("should have initial state with user and session as null", () => {
		const state = useAuthStore.getState();
		expect(state.user).toBeNull();
		expect(state.session).toBeNull();
	});

	it("should update user state correctly", () => {
		act(() => useAuthStore.setState({ user: mockUser }, true));
		const state = useAuthStore.getState();
		expect(state.user).toEqual(mockUser);
	});

	it("should update session state correctly", () => {
		act(() => useAuthStore.setState({ session: mockSession }, true));
		const state = useAuthStore.getState();
		expect(state.session).toEqual(mockSession);
	});

	it("should update both user and session states correctly", () => {
		act(() =>
			useAuthStore.setState({ session: mockSession, user: mockUser }, true)
		);
		const state = useAuthStore.getState();
		expect(state.user).toEqual(mockUser);
		expect(state.session).toEqual(mockSession);
	});
});
