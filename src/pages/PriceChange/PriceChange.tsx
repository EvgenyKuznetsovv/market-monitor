import { useEffect, useState } from "react"
import {Chart, registerables } from 'chart.js'
import LinerChart from "../../components/LinerChart/LinerChart"
import { coins, currency } from "../../CoinSettings"
import styles from './PriceChange.module.scss'
import IHistoryData from "../../interfaces/IHistoryData"
import IChartData from "../../interfaces/IChartData"
import { useDispatch, useSelector } from "../../redux/hooks"
import { fetchPriceChange } from "../../redux/slices/pricesChange"
import Loading from "../../components/Loading/Loading"
import Failed from "../../components/Failed/Failed"

Chart.register(...registerables)

function createChartData(historyData: IHistoryData[]): IChartData{
    return {
			labels: historyData.map(d => d.time),
			datasets: [
				{
					label: `Цена`,
					data: historyData.map(d => d.close),
					borderColor: 'rgba(75, 192, 192, 1)',
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					fill: false,
					borderWidth: 1,
				},
			],
		}
}

interface AppState{
    changePrice: {
        prices: IHistoryData[]
        status: string
    }
}

export default function PriceChange() {
    const dispatch = useDispatch();
    const prices = useSelector((state: AppState) => state.changePrice)
    const chartData = createChartData(prices.prices);

    const isLoading = prices.status === 'loading';
    const isError = prices.status === 'error';

    function selectHandler(event: React.ChangeEvent<HTMLSelectElement>){
        const coin = event.target.value;
        dispatch(fetchPriceChange({ symbol: `${coin}${currency}` }))
        
    }
    
    useEffect(()=>{
        dispatch(fetchPriceChange({symbol: `${coins[0][1]}${currency}`}))
    },[]);
        

    return (
			<div className={styles.container}>
				<h1>График изменения цены</h1>
                {isLoading && <Loading/>}
                {isError && <Failed/>}
				<div>
					<LinerChart chartData={chartData} />
				</div>
				<div>
					<form className={styles.selectCoin}>
						<label htmlFor='coin'>Монета</label>
						<select onChange={selectHandler}>
							{coins.map((coin, index) => (
								<option value={coin[1]} key={index}>
									{coin[0]}
								</option>
							))}
						</select>
					</form>
				</div>
			</div>
		)
}