import { coins, intervals, numbersOfCandles } from '../../CoinSettings';
import styles from './CandleForm.module.scss';
import { useCandleForm } from '../../hooks/candleForm';

interface Props {
    send: (coin: string, interval: string, candleNumber: number) => void;
}

export default function CandleForm({ send }: Props) {
    const { coin, interval, candlesNumber, submitHandler, setCoin, setInterval, setCandlesNumber } =
        useCandleForm(send);

    return (
        <form onSubmit={submitHandler} className={styles.settings}>
            <div className={styles.formGroup}>
                <label htmlFor="coin">Монета</label>
                <select
                    id="coin"
                    name="coin"
                    value={coin}
                    onChange={(event) => setCoin(event.target.value)}
                >
                    {coins.map((coin, index) => (
                        <option value={coin[1]} key={index}>
                            {coin[0]}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="interval">Интервал</label>
                <select
                    id="interval"
                    name="interval"
                    value={interval}
                    onChange={(event) => setInterval(event.target.value)}
                >
                    {intervals.map((interval, index) => (
                        <option value={interval[1]} key={index}>
                            {interval[0]}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="candles">Количество свечей</label>
                <select
                    id="candles"
                    name="candles"
                    value={candlesNumber}
                    onChange={(event) => setCandlesNumber(+event.target.value)}
                >
                    {numbersOfCandles.map((num, index) => (
                        <option value={num} key={index}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className={styles.submitButton}>
                Готово
            </button>
        </form>
    );
}
