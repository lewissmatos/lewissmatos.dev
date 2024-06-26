import { ILogin, ISignUp } from "@/interfaces/auth.interface";
import { useAxiosInstance } from "./useAxiosInstance";
import toast from "react-hot-toast";
import {
	getCsrfToken,
	getSession,
	signIn,
	signOut as nextSignOut,
} from "next-auth/react";
import { useLocale } from "@/hooks/useLocale";
import { useAuthStore } from "@/store/auth.store";

const useAuthService = () => {
	const { _axiosInstance } = useAxiosInstance();
	const setAuth = useAuthStore((state) => state.setAuth);
	const { translate } = useLocale();
	const login = async (payload: ILogin) => {
		try {
			const res = await signIn("credentials", {
				...payload,
				redirect: false,
			});

			if (res?.error) {
				toast.error(res.error);
				return;
			}
			if (res?.ok) {
				const session = await getSession();
				const jwt = await getCsrfToken();

				if (!session?.user?.email) {
					toast.error(translate("toast.userNotFound"));
					throw new Error("User not found");
				}
				const response = await getCurrentUser(session?.user?.email);
				setAuth({
					user: response.data.data,
					session: { accessToken: jwt as string },
				});
				toast.success(translate("toast.loginSuccessfully"));
				return res.ok;
			}
		} catch (error) {
			throw new Error((error as any)?.message);
		}
	};

	const signUp = async (payload: ISignUp) => {
		const { name, email, password } = payload;
		try {
			const response = await _axiosInstance.post("/api/auth/sign-up", {
				name,
				email,
				password,
			});
			if (response.status !== 201 || !response.data) {
				toast.error(translate("toast.signUpFailed"));

				throw new Error("Sign up failed");
			}
			const isOk = await login({ email, password });
			if (!isOk) {
				toast.error(translate("toast.loginFailed"));
			}

			toast.success(translate("toast.loginSuccessfully"));
			return isOk;
		} catch (error) {
			throw new Error((error as any)?.message);
		}
	};

	const signOut = async () => {
		try {
			setAuth({
				user: null,
				session: null,
			});
			await nextSignOut({ redirect: false });
		} catch (error) {
			throw new Error((error as any)?.message);
		}
	};

	const getCurrentUser = async (email: string) => {
		const user = await _axiosInstance.get(`/api/auth/user?email=${email}`);
		return user;
	};

	return { login, signUp, signOut };
};

export default useAuthService;
