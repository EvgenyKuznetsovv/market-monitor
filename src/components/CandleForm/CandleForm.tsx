import { useState } from "react"
import { currency, coins, intervals, numbersOfCandles } from "../../CoinSettings"
import styles from './CandleForm.module.scss'

interface Props {
	send: (coin: string, interval: string, candleNumber: number) => void
}

export default function ({send}: Props) {
    const [coin, setCoin] = useState<string>(coins[0][1]);
    const [interval, setInterval] = useState<string>(intervals[0][1]);
    const [candlesNumber, setCandlesNumber] =  useState<number>(numbersOfCandles[0]);

    // console.log(coin, interval, candlesNumber);

    const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
        send(coin, interval, candlesNumber);
	}

    return (
			<form onSubmit={submitHandler} className={styles.settings}>
				<div className={styles.formGroup}>
					<label htmlFor='coin'>Монета</label>
					<select id='coin' name='coin' value={coin} onChange={(event)=>setCoin(event.target.value)}>
						{coins.map((coin: string[], index) => (
							<option value={`${coin[1]}`} key={index}>
								{coin[0]}
							</option>
						))}
					</select>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='interval'>Интервал</label>
					<select id='interval' name='interval' value={interval} onChange={event => setInterval(event.target.value)}>
						{intervals.map((interval: string[], index) => (
							<option value={interval[1]} key={index}>
								{interval[0]}
							</option>
						))}
					</select>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='candles'>Количество свечей</label>
					<select id='candles' name='candles' value={candlesNumber} onChange={event => setCandlesNumber(+event.target.value)}>
						{numbersOfCandles.map((num: number, index) => (
							<option value={num} key={index}>
								{num}
							</option>
						))}
					</select>
				</div>

				<button type='submit' className={styles.submitButton}>
					Готово
				</button>
			</form>
		)
}