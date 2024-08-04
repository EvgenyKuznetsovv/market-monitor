import Prices from "../../components/Prices/Prices";
import styles from './Home.module.scss';
import { useSelector } from "../../redux/hooks";
import IPriceData from "../../interfaces/IPriceData";
import Loading from "../../components/Loading/Loading";
import Failed from "../../components/Failed/Failed";


interface AppState {
	prices: {
		prices: IPriceData[]
		status: string
	}
}

export default function Home (){
	const prices = useSelector((state: AppState) => state.prices)

	const isLoading = prices.prices.length === 0;
	const isError = prices.status === 'error'

    console.log(prices)

	return (
		<>
			<h1 className={styles.siteName}>Market Monitor</h1>
			{isLoading && <Loading />}
			{isError && <Failed />}
			<div className={styles.container}>
				<div className={styles.homeInfo}>СОДЕРЖИМОЕ ГЛАВНОЙ СТРАНИЦЫ</div>
				<div className={styles.prices}>
					<Prices />
				</div>
			</div>
		</>
	)
}