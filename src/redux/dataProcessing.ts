import DataPoint from "../interfaces/DataPoint"

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

