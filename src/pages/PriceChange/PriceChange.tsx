import { useEffect, useState } from "react"
import {Chart, registerables } from 'chart.js'
import LinerChart from "../../components/LinerChart/LinerChart"
import { coins } from "../../CoinSettings"
import styles from './PriceChange.module.scss'

Chart.register(...registerables)

interface RawData {
	[index: number]: number | string
}

interface HistoryData {
    time: string,
    close: number,
}

function processedHistoryData(rawData: RawData[]): HistoryData[] {
    return rawData.map((item) => ({
        time: new Date(item[0]).toLocaleDateString(),
        close: parseFloat(item[4] as string),
    }) )
}

function createChartData(historyData: HistoryData[], symbol: string ){
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

export default function PriceChange() {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    function selectHandler(event: React.ChangeEvent<HTMLSelectElement>){
        console.log(event.target.value);
    }
    
    const getKlines = async (symbol: string) => {
			const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=50`
			try {
				const response = await fetch(url)
				const data = await response.json()
				return data
			} catch (error) {
				console.error(`Error fetching data for ${symbol}:`, error)
			}
		}

        useEffect(()=>{
            getKlines('BTCUSDT').then(data =>{
							setData(
								createChartData(processedHistoryData(data), 'BTCUSDT'),
							)
                            console.log(createChartData(processedHistoryData(data), 'BTCUSDT') );
                            setLoading(true);
                        }        
					);
        },[]);
        console.log('data: ', data);

    return (
			<div className={styles.container}>
				<h1>График изменения цены</h1>
				<div>
					{loading && <LinerChart chartData={data} />}
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