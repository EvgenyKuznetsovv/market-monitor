import { configureStore } from '@reduxjs/toolkit';
import { candlesReducer } from './slices/candles';
import { pricesReducer } from './slices/price';
import { priceChangeReducer } from './slices/pricesChange';
// import { priceLocalStorage } from './middlewares/priceLocalStorage';

export const store = configureStore({
    reducer: {
        candles: candlesReducer,
        prices: pricesReducer,
        changePrice: priceChangeReducer,
    },
    // middleware: (getDefaultMiddleware): Middleware[] => getDefaultMiddleware().concat(priceLocalStorage),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
