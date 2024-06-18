"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "@nextui-org/react";
import { AppStore, makeStore, useAppSelector } from "@/redux/appStore";
import { isDarkModeEnabled } from "@/utils/ui.util";

const Loading = () => {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
			}}
			className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center"
		>
			<Spinner size="lg" aria-label="Loading..." color="default" />
		</div>
	);
};
export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	const persistor = persistStore(storeRef.current);

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
