import CandlestickChart from '../../components/CandlestickChart/CandlestickChart';
import CandleForm from '../../components/CandleForm/CandleForm';
import styles from './Candles.module.scss';
import Loading from '../../components/Loading/Loading';
import Failed from '../../components/Failed/Failed';
import { useCandles } from '../../hooks/candles';
import { ErrorBoundary } from 'react-error-boundary';

export default function Candles() {
    const { candles, isLoading, isError, formHandler } = useCandles();

    return (
        <>
            <h1 className={styles.header}>График свечей</h1>
            {isLoading && <Loading />}
            {isError && <Failed />}
            <ErrorBoundary fallback={<h1>Ошибка при отрисовке графика</h1>}>
                <div className={styles.container}>
                    <div className={styles.chart}>
                        <CandlestickChart data={candles.candles} width={800} ratio={3} />
                    </div>

                    <div className={styles.settings}>
                        <CandleForm send={formHandler} />
                    </div>
                </div>
            </ErrorBoundary>
        </>
    );
}
