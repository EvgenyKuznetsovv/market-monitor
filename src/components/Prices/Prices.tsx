import { useEffect, useState } from "react";
import { tempDataPrice } from "../../CoinSettings";
import styles from './Prices.module.scss'
import { currency, coins } from "../../CoinSettings";
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

    // const isLoading = prices.status === 'loading';
    // const isError = prices.status === 'error'

    useEffect(()=>{
        dispatch(fetchPrices({currency, coins}));
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
				</div>
			</div>
		)
}