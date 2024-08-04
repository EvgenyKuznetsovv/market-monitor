import { configureStore, Middleware} from "@reduxjs/toolkit";
import { candlesReducer } from "./slices/candles";
import { pricesReducer } from "./slices/price";
import { priceChangeReducer } from "./slices/pricesChange";
// import { localStoragePrice } from "./middlewares/localstoragePrice";



export const store = configureStore({
	reducer: {
		candles: candlesReducer,
		prices: pricesReducer,
		changePrice: priceChangeReducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStoragePrice),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;