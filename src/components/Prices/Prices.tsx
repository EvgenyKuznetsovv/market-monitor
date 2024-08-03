import { useEffect, useState } from "react";
import { tempDataPrice } from "../../CoinSettings";
import styles from './Prices.module.scss'
import { currency, coins } from "../../CoinSettings";

const prices = {
	BTCUSDT: '23032 USDT',
	ETHUSDT: '2500 USDT',
	BNBUSDT: '350 USDT',
	XRPUSDT: '0.75 USDT',
	ADAUSDT: '1.20 USDT',
	SOLUSDT: '35.00 USDT',
	DOTUSDT: '15.00 USDT',
	DOGEUSDT: '0.25 USDT',
	MATICUSDT: '1.50 USDT',
	AVAXUSDT: '30.00 USDT',
}

console.log(tempDataPrice);

interface IPriceData {
    [key: string]: string
}

interface ICoin {
	0: string
	1: string
}

function priceProcessed(priceData: IPriceData[], currency: string, coins: string[][]):IPriceData[] {
    const coinSymbols = coins.map(coin => `${coin[1]}${currency}`);
    const filteredData = priceData.filter(item => coinSymbols.includes(item.symbol));
    const cleanFilterData = filteredData.map(item => ({symbol: item.symbol.replace(currency, ''), price: (+item.price).toFixed(2) }) )
    return cleanFilterData;
}

export default function() {
    const [prices, setPrices] = useState<IPriceData[]>([]);
    useEffect(()=>{
        const data = priceProcessed(tempDataPrice, currency, coins);
        setPrices(data);
        // console.log(data);
    },[])

    console.log(prices);

    return (
			<div className={styles.container}>
				<h1 className={styles.header}>Цены</h1>
				<div className={styles.pricesContainer}>
					{prices.map((price: IPriceData, index) => (
						<div className={styles.priceItem} key={index}>
							<b>{price.symbol}:</b> {price.price} {currency}
						</div>
					))}
					{/* {Object.entries(prices).map(([key, value]) => (
						<div className={styles.priceItem} key={key}>
							{key}: {'324243 usdt'}
						</div>
					))} */}
				</div>
			</div>
		)
}