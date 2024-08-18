import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export const priceLocalStorage: Middleware<{}, RootState> = (storeAPI) => (next) => (action) => {
    const result = next(action);
    const state = storeAPI.getState();

    if ((action as PayloadAction).type === 'prices/fetchPrices/fulfilled') {
        localStorage.setItem('prices', JSON.stringify(state.prices.prices));
    }

    return result;
};
