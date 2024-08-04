import { configureStore, Middleware} from "@reduxjs/toolkit";
import { candlesReducer } from "./slices/candles";
import { pricesReducer } from "./slices/price";
// import { localStoragePrice } from "./middlewares/localstoragePrice";



export const store = configureStore({
	reducer: {
		candles: candlesReducer,
		prices: pricesReducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStoragePrice),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;