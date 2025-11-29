import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { BattingResultsByExitVelocity } from '@/types/types';
import { StatTypeENUM } from '@/components/BattingByExitVelocity/BattingByExitVelocity';

type BattingByExitVelocityProps = {
    data: BattingResultsByExitVelocity[];
    statType: StatTypeENUM;
    title?: string;            // optional override
    showTrendline?: boolean;
    height?: number;
    width?: number;
    markerColor?: string;
    trendlineColor?: string;
};

type LinearFit = {
    m: number;
    b: number;
    r2: number;
};

function linearRegression(x: number[], y: number[]): LinearFit | null {
    const n = x.length;
    if (n < 2) return null;

    const sumX = x.reduce((a, v) => a + v, 0);
    const sumY = y.reduce((a, v) => a + v, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;

    let sXX = 0, sXY = 0, sYY = 0;
    for (let i = 0; i < n; i++) {
        const dx = x[i] - meanX;
        const dy = y[i] - meanY;
        sXX += dx * dx;
        sXY += dx * dy;
        sYY += dy * dy;
    }

    if (sXX === 0) return null;

    const m = sXY / sXX;
    const b = meanY - m * meanX;

    let ssr = 0;
    for (let i = 0; i < n; i++) {
        const yHat = m * x[i] + b;
        ssr += (yHat - meanY) ** 2;
    }
    const r2 = sYY === 0 ? 1 : Math.min(1, Math.max(0, ssr / sYY));

    return { m, b, r2 };
}

function getStatLongLabel(statType: StatTypeENUM) {
    return statType === StatTypeENUM.AVG
        ? 'Batting Avg'
        : 'Slugging Pct';
}

function getComputedValue(d: BattingResultsByExitVelocity, statType: StatTypeENUM) {
    return (statType === StatTypeENUM.AVG ? d.hits : d.totalBases) / d.atBats;
}

const BattingByExitVelocityPlot: React.FC<BattingByExitVelocityProps> = ({
                                                                             data,
                                                                             statType,
                                                                             title,
                                                                             showTrendline = true,
                                                                             height = 480,
                                                                             width,
                                                                             markerColor = '#1f77b4',
                                                                             trendlineColor = '#d62728',
                                                                         }) => {
    const filtered = useMemo(() => data.filter(d => d.atBats > 5), [data]);

    const { x, y } = useMemo(() => {
        const xVals: number[] = [];
        const yVals: number[] = [];
        for (const d of filtered) {
            xVals.push(d.exitVelocity);
            yVals.push(getComputedValue(d, statType));
        }
        return { x: xVals, y: yVals };
    }, [filtered, statType]);

    const fit = useMemo(() => linearRegression(x, y), [x, y]);

    const trendlineTrace: Partial<Plotly.PlotData> | null = useMemo(() => {
        if (!showTrendline || !fit || x.length < 2) return null;
        const minX = Math.min(...x);
        const maxX = Math.max(...x);
        const xLine = [minX, maxX];
        const yLine = xLine.map(xx => fit.m * xx + fit.b);

        return {
            x: xLine,
            y: yLine,
            type: 'scatter',
            mode: 'lines',
            name: `Linear fit: y = ${fit.m.toFixed(4)}·x + ${fit.b.toFixed(4)} (R² = ${fit.r2.toFixed(3)})`,
            line: { color: trendlineColor, width: 2 },
            hoverinfo: 'skip',
        } as Partial<Plotly.PlotData>;
    }, [showTrendline, fit, x, trendlineColor]);

    const scatterTrace: Partial<Plotly.PlotData> = useMemo(() => {
        const statLabel = getStatLongLabel(statType);
        return {
            x,
            y,
            type: 'scatter',
            mode: 'markers',
            name: statLabel,
            marker: { color: markerColor, size: 8 },
            customdata: filtered.map(d => [d.hits, d.totalBases, d.atBats]),
            hovertemplate:
                'Exit Velo: %{x:.0f} mph<br>' +
                `${statLabel}: %{y:.3f}<br>` +
                'Hits: %{customdata[0]}<br>' +
                'Total Bases: %{customdata[1]}<br>' +
                'AB: %{customdata[2]}<extra></extra>',
        };
    }, [x, y, filtered, markerColor, statType]);

    const computedTitle =
        title ??
        `${getStatLongLabel(statType)} vs Exit Velocity`;

    const layout: Partial<Plotly.Layout> = {
        title: {
            text : computedTitle
        },
        autosize: !width,
        width,
        height,
        margin: { l: 60, r: 20, t: 60, b: 60 },
        xaxis: {
            title: {
                text: 'Exit Velocity (mph)'
            },
            range: [Math.min(...x) - 5, Math.max(...x) + 5],
            zeroline: false,
            showgrid: true,
        },
        yaxis: {
            title: {
                text: getStatLongLabel(statType)
            },
            range: [-.05, Math.max(1, Math.max(...y) + 0.05)],
            tickformat: '.3f',
            zeroline: false,
            showgrid: true,
        },
        legend: { orientation: 'h', y: -0.2 },
    };

    return (
        <Plot
            data={[scatterTrace, ...(trendlineTrace ? [trendlineTrace] as Partial<Plotly.PlotData>[] : [])]}
            layout={layout}
            config={{
                responsive: true,
                displayModeBar: true,
                modeBarButtonsToRemove: ['toggleSpikelines'],
                scrollZoom: false,
            }}
            style={{ width: '100%' }}
        />
    );
};

export default BattingByExitVelocityPlot;

