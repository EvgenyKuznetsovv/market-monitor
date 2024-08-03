import { configureStore } from "@reduxjs/toolkit";
import { candlesReducer } from "./slices/candles";
import { pricesReducer } from "./slices/price";


export const store = configureStore({
    reducer:{
        candles: candlesReducer,
        prices: pricesReducer,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>