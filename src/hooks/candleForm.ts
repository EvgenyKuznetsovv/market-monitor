import { useState } from 'react';
import { coins, intervals, numbersOfCandles } from '../CoinSettings';

export function useCandleForm(
    send: (coin: string, interval: string, candleNumber: number) => void,
) {
    const [coin, setCoin] = useState<string>(coins[0][1]);
    const [interval, setInterval] = useState<string>(intervals[0][1]);
    const [candlesNumber, setCandlesNumber] = useState<number>(numbersOfCandles[0]);

    // console.log(coin, interval, candlesNumber);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        send(coin, interval, candlesNumber);
    };

    return { coin, interval, candlesNumber, submitHandler, setCoin, setInterval, setCandlesNumber };
}
