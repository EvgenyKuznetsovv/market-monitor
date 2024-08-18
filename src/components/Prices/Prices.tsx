import styles from './Prices.module.scss';
import { currency } from '../../CoinSettings';
import IPriceData from '../../interfaces/IPriceData';
import { usePrices } from '../../hooks/prices';

export default function Prices() {
    const { prices } = usePrices();

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Цены</h1>
            <div className={styles.pricesContainer}>
                {prices.map((price: IPriceData, index) => (
                    <div className={styles.priceItem} key={index}>
                        <b>{price?.symbol}:</b> {price?.price} {currency}
                    </div>
                ))}
            </div>
        </div>
    );
}
