import { useSelector } from '../redux/hooks';
import IPriceData from '../interfaces/IPriceData';

interface AppState {
    prices: {
        prices: IPriceData[];
        status: string;
    };
}

export function useHome() {
    const prices = useSelector((state: AppState) => state.prices);

    const isLoading = prices.prices.length === 0;
    const isError = prices.status === 'error';

    return { isLoading, isError };
}
