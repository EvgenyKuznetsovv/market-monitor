import { Line } from 'react-chartjs-2';
import { currency } from '../../CoinSettings';
import styles from './LinerChart.module.scss';
import IChartData from '../../interfaces/IChartData';

export default function LinerChart({ chartData }: { chartData: IChartData }) {
    return (
        <div className={styles.chart}>
            <Line
                data={chartData}
                options={{
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Дата',
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: `${currency}`,
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
