import toast from "react-hot-toast";
import { useLocale } from "./useLocale";

const useToast = () => {
	const { translate } = useLocale();

	const success = (message: string) => {
		return toast.success(translate(message));
	};

	const error = (message: string) => {
		return toast.error(translate(message));
	};

	return { success, error };
};

export default useToast;
