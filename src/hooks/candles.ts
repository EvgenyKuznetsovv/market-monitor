import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../redux/hooks';
import DataPoint from '../interfaces/DataPoint';
import { fetchCandles } from '../redux/slices/candles';
import { currency, coins, intervals, numbersOfCandles } from '../CoinSettings';

interface AppState {
    candles: {
        candles: DataPoint[];
        status: string;
    };
}

export function useCandles() {
    const dispatch = useDispatch();
    const candles = useSelector((state: AppState) => state.candles);

    const isLoading = candles.status === 'loading';
    const isError = candles.status === 'error';

    const formHandler = useCallback(
        (coin: string, interval: string, candleNumber: number) => {
            dispatch(
                fetchCandles({
                    symbol: `${coin}${currency}`,
                    interval,
                    limit: candleNumber,
                }),
            );
            // console.log(coin, interval, candleNumber);
        },
        [dispatch],
    );

    useEffect(() => {
        // form default values
        formHandler(coins[0][1], intervals[0][1], numbersOfCandles[0]);
    }, [formHandler]);
    return { candles, isLoading, isError, formHandler };
}
