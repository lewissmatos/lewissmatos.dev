import preferencesReducer from "./reducers/preferences/preferencesSlice";
import authReducer from "./reducers/auth/authSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
	preferences: preferencesReducer,
	auth: authReducer,
});
const persistedReducer = persistReducer(
	{
		key: "root",
		storage,
	},
	reducers
);
export const makeStore = () => {
	return configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					serializableCheck: false,
				},
			}),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = (action: any) => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
