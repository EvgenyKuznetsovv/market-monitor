import React, { useEffect, useState } from 'react';
import DataPoint from '../../interfaces/DataPoint';
import CandlestickChart from '../../components/CandlestickChart/CandlestickChart';
import styles from "./Candles.module.scss"

const tempData = [
  [1722178800000, '67746.00000000', '67777.77000000', '67577.63000000', '67645.00000000', '325.75611000', 1722182399999, '22045798.69396930', 34298, '139.66477000', '9451461.96623660', '0'],
  [1722182400000, '67645.00000000', '67753.26000000', '67624.00000000', '67680.01000000', '249.98290000', 1722185999999, '16918125.68584220', 23482, '106.49755000', '7207812.01220320', '0'],
  [1722186000000, '67680.01000000', '67998.42000000', '67680.00000000', '67988.47000000', '309.88669000', 1722189599999, '21023356.89076620', 54469, '175.66541000', '11916555.59643430', '0'],
  [1722189600000, '67988.47000000', '68318.43000000', '67939.81000000', '68236.01000000', '608.47713000', 1722193199999, '41476780.69169460', 44626, '362.66472000', '24722770.66035480', '0'],
  [1722193200000, '68236.00000000', '68295.00000000', '68084.58000000', '68112.00000000', '342.16948000', 1722196799999, '23335254.60803330', 32272, '153.40825000', '10462492.84983060', '0'],
  [1722196800000, '68112.00000000', '68164.76000000', '67954.48000000', '68007.99000000', '221.81791000', 1722200399999, '15093595.69532690', 23098, '79.42909000', '5405237.66234870', '0'],
  [1722200400000, '68008.00000000', '68069.00000000', '67801.62000000', '68021.93000000', '324.46082000', 1722203999999, '22045751.42207040', 27679, '162.25021000', '11024693.67764860', '0'],
  [1722204000000, '68021.93000000', '68253.59000000', '67941.94000000', '68010.24000000', '421.43621000', 1722207599999, '28688133.96113140', 38593, '176.05621000', '11985749.88551430', '0'],
  [1722207600000, '68010.23000000', '68277.83000000', '67956.00000000', '68249.88000000', '236.66400000', 1722211199999, '16125061.12545500', 23446, '120.46733000', '8207549.01912250', '0'],
  [1722211200000, '68249.88000000', '68999.00000000', '68168.00000000', '68714.01000000', '1541.58518000', 1722214799999, '105950500.76234130', 92312, '850.76909000', '58467945.45154290', '0'],
];

const currency = 'USDT';

const coins = [
	[ "Bitcoin", `BTC`],
	[ "Ethereum", `ETH`],
	[ "BinanceCoin", `BNB`],
	[ "Ripple", `XRP`],
	[ "Cardano", `ADA`],
	[ "Solana", `SOL`],
	[ "Polkadot", `DOT`],
	[ "Dogecoin", `DOGE`],
	[ "Polygon", `MATIC`],
	[ "Avalanche", `AVAX`],
	[ "Litecoin", `LTC`],
]

const intervals = [
	['1 час', '1h'],
	['2 часа', '2h'],
	['4 часа', '4h'],
	['6 часов', '6h'],
	['8 часов', '8h'],
	['12 часов', '12h'],
	['1 день', '1d'],
];

const numbersOfCandles = [10, 20, 50, 100, 150, 200];

interface RawData {
	[index: number]: number | string
}

function parseToNumber(str: string): number {
	return +Number.parseFloat(str).toFixed(2)
}

function dataPreparation(rawData: RawData[]): DataPoint[] {
	const processedData: DataPoint[] = []

	rawData.map((item: RawData) => {
		processedData.push({
			date: new Date(item[0] as number),
			open: parseToNumber(item[1] as string),
			high: parseToNumber(item[2] as string),
			low: parseToNumber(item[3] as string),
			close: parseToNumber(item[4] as string),
		})
	})

	return processedData
}



export default function Candles() {
	const [data, setData] = useState<DataPoint[]>([]);

    useEffect(()=>{
		setData(dataPreparation(tempData));
	}, [])

    return (
			<>
				<h1 className={styles.header}>График свечей</h1>

				<div className={styles.container}>

					<div className={styles.chart}>
						<CandlestickChart data={data} width={800} ratio={3} />
					</div>

					<form className={styles.settings}>

						<div className={styles.formGroup}>
							<label htmlFor='coin'>Монета</label>
							<select id='coin' name='coin'>
								{ coins.map((coin: string[], index) => <option value={`${coin[1]}${currency}`} key={index}>{coin[0]}</option> ) }
							</select>
						</div>
					
						<div className={styles.formGroup}>
							<label htmlFor='interval'>Интервал</label>
							<select id='interval' name='interval'>
								{ intervals.map((interval: string[], index ) => <option value={interval[1]} key={index}>{interval[0]}</option>)}
							</select>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='candles'>Количество свечей</label>
							<select id='candles' name='candles'>
								{ numbersOfCandles.map((num: number, index) => <option value={num} key={index}>{num}</option>)}
							</select>
						</div>

						<button className={styles.submitButton}>Готово</button>
					</form>
				</div>
			</>
		)
}
