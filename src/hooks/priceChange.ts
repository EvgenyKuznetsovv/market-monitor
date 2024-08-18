import { useEffect } from 'react';
import IHistoryData from '../interfaces/IHistoryData';
import IChartData from '../interfaces/IChartData';
import { useDispatch, useSelector } from '../redux/hooks';
import { currency, coins } from '../CoinSettings';
import { fetchPriceChange } from '../redux/slices/pricesChange';

interface AppState {
    changePrice: {
        prices: IHistoryData[];
        status: string;
    };
}

function createChartData(historyData: IHistoryData[]): IChartData {
    return {
        labels: historyData.map((d) => d.time),
        datasets: [
            {
                label: `Цена`,
                data: historyData.map((d) => d.close),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                borderWidth: 1,
            },
        ],
    };
}

export function usePriceChange() {
    const dispatch = useDispatch();
    const prices = useSelector((state: AppState) => state.changePrice);
    const chartData = createChartData(prices.prices);

    const isLoading = prices.status === 'loading';
    const isError = prices.status === 'error';

    function selectHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        const coin = event.target.value;
        dispatch(fetchPriceChange({ symbol: `${coin}${currency}` }));
    }

    useEffect(() => {
        dispatch(fetchPriceChange({ symbol: `${coins[0][1]}${currency}` }));
    }, [dispatch]);

    return { chartData, isLoading, isError, selectHandler };
}
