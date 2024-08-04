import { useEffect, useState } from "react";
import styles from './Prices.module.scss'
import { currency, coins, timeUpdate } from "../../CoinSettings";
import { useDispatch, useSelector } from "../../redux/hooks";
import { fetchPrices } from "../../redux/slices/price";
import IPriceData from "../../interfaces/IPriceData";


interface AppState {
	prices: {
		prices: IPriceData[]
		status: string
	}
}

export default function() {
    const dispatch = useDispatch();
    const prices = useSelector((state: AppState) => state.prices.prices);

    useEffect(() => {
        dispatch(fetchPrices({ currency, coins }));

        const intervalId = setInterval(() => {
            dispatch(fetchPrices({ currency, coins }))
        }, timeUpdate);
        
        return () => {
            clearInterval(intervalId)
        }
    }, [])

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
				</div>
			</div>
		)
}