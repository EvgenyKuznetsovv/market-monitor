import DataPoint from "../interfaces/DataPoint"
import IPriceData from "../interfaces/IPriceData"
import IHistoryData from "../interfaces/IHistoryData"
import IChartData from "../interfaces/IChartData"

interface RawData {
	[index: number]: number | string
}

function parseToNumber(str: string): number {
	return +Number.parseFloat(str).toFixed(2)
}

export function candlesDataPreparation(rawData: RawData[]): DataPoint[] {
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


export function priceDataProcessed(priceData: IPriceData[], currency: string, coins: string[][]):IPriceData[] {
    const coinSymbols = coins.map(coin => `${coin[1]}${currency}`);
    const filteredData = priceData.filter(item => coinSymbols.includes(item.symbol));
    const cleanFilterData = filteredData.map(item => ({symbol: item.symbol.replace(currency, ''), price: (+item.price).toFixed(2) }) )
    return cleanFilterData;
}

export function processedHistoryData(rawData: RawData[]): IHistoryData[] {
	return rawData.map(item => ({
		time: new Date(item[0]).toLocaleDateString(),
		close: parseFloat(item[4] as string),
	}))
}



