import { configureStore } from "@reduxjs/toolkit";
import { candlesReducer } from "./slices/candles";


export const store = configureStore({
    reducer:{
        candles: candlesReducer,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>