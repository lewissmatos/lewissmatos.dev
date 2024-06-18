import { ILogin, ISignUp } from "@/interfaces/auth.interface";
import { useAxiosInstance } from "./useAxiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
	getCsrfToken,
	getSession,
	signIn,
	signOut as nextSignOut,
} from "next-auth/react";
import { setAuth, setUser } from "@/redux/reducers/auth/authSlice";

const useAuthService = () => {
	const { axiosInstance } = useAxiosInstance();
	const dispatch = useDispatch();
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
					toast.error("User not found");
					throw new Error("User not found");
				}
				const response = await getCurrentUser(session?.user?.email);
				dispatch(
					setAuth({
						user: response.data.data,
						session: { accessToken: jwt as string },
					})
				);
				toast.success("Login successfully");
				return res.ok;
			}
		} catch (error) {
			throw new Error((error as any)?.message);
		}
	};

	const signUp = async (payload: ISignUp) => {
		const { name, email, password } = payload;
		try {
			const response = await axiosInstance.post("/api/auth/sign-up", {
				name,
				email,
				password,
			});
			if (response.status !== 201 || !response.data) {
				toast.error("Sign up failed");
				throw new Error("Sign up failed");
			}
			const isOk = await login({ email, password });
			if (!isOk) {
				toast.error("Login failed");
			}
			toast.success("Sign up successfully");
			return isOk;
		} catch (error) {
			throw new Error((error as any)?.message);
		}
	};

	const signOut = async () => {
		try {
			dispatch(setAuth(null));
			await nextSignOut({ redirect: false });
		} catch (error) {
			throw new Error((error as any)?.message);
		}
	};

	const getCurrentUser = async (email: string) => {
		const user = await axiosInstance.get(`/api/auth/user?email=${email}`);
		return user;
	};

	return { login, signUp, signOut };
};

export default useAuthService;
