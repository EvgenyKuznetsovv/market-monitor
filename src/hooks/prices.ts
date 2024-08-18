import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/hooks';
import { currency, coins, timeUpdate } from '../CoinSettings';
import IPriceData from '../interfaces/IPriceData';
import { fetchPrices } from '../redux/slices/price';

interface AppState {
    prices: {
        prices: IPriceData[];
        status: string;
    };
}

export function usePrices() {
    const dispatch = useDispatch();
    const prices = useSelector((state: AppState) => state.prices.prices);

    useEffect(() => {
        dispatch(fetchPrices({ currency, coins }));

        const intervalId = setInterval(() => {
            dispatch(fetchPrices({ currency, coins }));
        }, timeUpdate);

        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch]);

    // console.log(prices);

    return { prices };
}
