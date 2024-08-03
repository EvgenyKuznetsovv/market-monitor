import React, { useEffect, useState } from 'react';
import DataPoint from '../../interfaces/DataPoint';
import CandlestickChart from '../../components/CandlestickChart/CandlestickChart';
import CandleForm from '../../components/CandleForm/CandleForm';
import styles from "./Candles.module.scss"
import { currency, coins, intervals, numbersOfCandles, tempData } from '../../CoinSettings';
import { useDispatch, useSelector } from '../../redux/hooks';
import { fetchCandles } from '../../redux/slices/candles';
import Loading from '../../components/Loading/Loading';
import Failed from '../../components/Failed/Failed';


interface AppState {
	candles: {
		candles: any[]
		status: string
	}
}


export default function Candles() {

	const dispatch = useDispatch();
	// const data = useSelector((state: AppState) => state.candles.candles);
	const candles = useSelector((state: AppState) => state.candles);
	
	const isLoading = candles.status === 'loading';
	const isError = candles.status === 'error';

	function FormHandler(coin: string, interval: string, candleNumber: number) {
		dispatch(fetchCandles({symbol: `${coin}${currency}`, interval, limit: candleNumber}));
		console.log(coin, interval, candleNumber);
	};
	
    useEffect(()=>{
			dispatch(fetchCandles({symbol: `${coins[0][1]}${currency}`, interval: intervals[0][1], limit: numbersOfCandles[0]}));
	}, []);

    return (
			<>
				<h1 className={styles.header}>График свечей</h1>
				{isLoading && <Loading/>}
				{isError && <Failed/>}
				<div className={styles.container}>

					<div className={styles.chart}>
						<CandlestickChart data={candles.candles} width={800} ratio={3} />
					</div>

					<div className={styles.settings}>
						<CandleForm send={FormHandler}/>
					</div>
					
				</div>
			</>
		)
}
