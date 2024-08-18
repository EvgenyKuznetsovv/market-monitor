export default interface IChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
        borderWidth: number;
    }>;
}
