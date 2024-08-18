import { Chart, registerables } from 'chart.js';
import LinerChart from '../../components/LinerChart/LinerChart';
import { coins } from '../../CoinSettings';
import styles from './PriceChange.module.scss';
import Loading from '../../components/Loading/Loading';
import Failed from '../../components/Failed/Failed';
import { usePriceChange } from '../../hooks/priceChange';
import { ErrorBoundary } from 'react-error-boundary';

Chart.register(...registerables);

export default function PriceChange() {
    const { chartData, isLoading, isError, selectHandler } = usePriceChange();

    return (
        <div className={styles.container}>
            <h1>График изменения цены</h1>
            {isLoading && <Loading />}
            {isError && <Failed />}
            <ErrorBoundary fallback={<h1>Ошибка при отрисовке графика</h1>}>
                <div>
                    <LinerChart chartData={chartData} />
                </div>
            </ErrorBoundary>
            <div>
                <form className={styles.selectCoin}>
                    <label htmlFor="coin">Монета</label>
                    <select onChange={selectHandler}>
                        {coins.map((coin, index) => (
                            <option value={coin[1]} key={index}>
                                {coin[0]}
                            </option>
                        ))}
                    </select>
                </form>
            </div>
        </div>
    );
}
