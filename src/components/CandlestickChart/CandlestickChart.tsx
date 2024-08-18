import React from 'react';
import { ChartCanvas, Chart } from 'react-financial-charts';
import { CandlestickSeries } from 'react-financial-charts';
import { XAxis, YAxis } from 'react-financial-charts';
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-financial-charts';
import { discontinuousTimeScaleProvider } from 'react-financial-charts';
import { last } from 'react-financial-charts';
import DataPoint from '../../interfaces/DataPoint';

interface Props {
    data: DataPoint[];
    width: number;
    ratio: number;
}

export default function CandlestickChart({ data, width, ratio }: Props) {
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
        (d: DataPoint) => new Date(d.date),
    );

    const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(data);
    const start = xAccessor(last(chartData));
    const end = xAccessor(chartData[Math.max(0, chartData.length - 150)]);
    const xExtents = [start, end];

    return (
        <ChartCanvas
            height={400}
            width={width}
            ratio={ratio}
            margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
            seriesName="Data"
            data={chartData}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            xExtents={xExtents}
        >
            <Chart id={1} yExtents={(d: DataPoint) => [d.high, d.low]}>
                <XAxis axisAt="bottom" orient="bottom" ticks={10} />
                <YAxis axisAt="left" orient="left" ticks={5} />
                <CandlestickSeries />
                <MouseCoordinateX
                    at="bottom"
                    orient="bottom"
                    displayFormat={(date) => new Date(date).toLocaleString()}
                />
                <MouseCoordinateY
                    at="left"
                    orient="left"
                    displayFormat={(d: number) => d.toFixed(2)}
                />
            </Chart>
            <CrossHairCursor />
        </ChartCanvas>
    );
}
